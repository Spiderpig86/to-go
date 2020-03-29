#!/usr/bin/env python
import gspread
import json
import os

from oauth2client.service_account import ServiceAccountCredentials
from enum import Enum, IntEnum

# Constants
SHEET_NAME = 'Seattle Asian Restaurants'
OUTPUT_DIR = 'out'
SECRET_PATH = './client_secret.secret.json'

class AppFields(str, Enum):
    DELIVERY_APPS = 'Delivery Apps'
    TAKEOUT = 'Curbside/Takeout'
    GIFTCARD = 'Gift Card'

class ChinatownWorksheetEnum(IntEnum):
    NAME = 1
    TYPES = 2
    PHONE = 3
    OPEN = 4
    POC_OWNED = 5
    WEBSITE = 6
    DELIVERY_APPS_1 = 7
    DELIVERY_APPS_2 = 8
    VEGAN = 9
    GIFT_CARDS = 10
    NOTES = 11

class SouthEndWorksheetEnum(IntEnum):
    NAME = 1
    _ = 2
    PHONE = 3
    POC_OWNED = 4
    WEBSITE = 5
    BUSINESS_DELIVERY = 6
    DELIVERY_APPS_1 = 7
    DELIVERY_APPS_2 = 8
    LOCATION = 9
    NOTES = 10

class OtherWorksheetEnum(IntEnum):
    NAME = 1
    LOCATION = 2
    PHONE = 3
    POC_OWNED = 4
    WEBSITE = 5
    BUSINESS_DELIVERY = 6
    DELIVERY_APPS = 7
    VEGAN = 8

def process_china_town(worksheet_name, sheet):
    worksheet = sheet.worksheet(worksheet_name)
    rows = worksheet.get_all_values()
    
    data = []
    for i in range(2, len(rows)):
        row = rows[i]
        
        delivery_apps = row[ChinatownWorksheetEnum.DELIVERY_APPS_1].split('\n')
        delivery_apps += row[ChinatownWorksheetEnum.DELIVERY_APPS_2].split('\n')

        services = [AppFields.TAKEOUT]
        if len(delivery_apps) > 0:
            services.append(AppFields.DELIVERY_APPS)
        if row[ChinatownWorksheetEnum.GIFT_CARDS] == 'yes':
            services.append(AppFields.GIFTCARD)

        has_vegan = None
        if row[ChinatownWorksheetEnum.VEGAN] == 'yes':
            has_vegan = True
        elif row[ChinatownWorksheetEnum.VEGAN] == 'no':
            has_vegan = False


        data.append({
            'name': row[ChinatownWorksheetEnum.NAME],
            'types': row[ChinatownWorksheetEnum.TYPES],
            'services': services,
            'phone': row[ChinatownWorksheetEnum.PHONE],
            'locations': [],
            'address': '',
            'website': row[ChinatownWorksheetEnum.WEBSITE],
            'deliveryApps': delivery_apps,
            'veganOptions': has_vegan,
            'price': ''
        })

    _write_to_file(worksheet_name, json.dumps(data, indent=4))

def process_south_end(worksheet_name, sheet):
    pass

def process_other(worksheet_name, sheet):
    pass

def _write_to_file(worksheet_name, stringified_json):
    if not os.path.isdir(f'./{OUTPUT_DIR}'):
        os.mkdir(f'./{OUTPUT_DIR}')
    with open(f'./{OUTPUT_DIR}/{worksheet_name}.json', 'w+') as f:
        f.write(stringified_json)

def main():
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name(SECRET_PATH, scope)
    client = gspread.authorize(creds)

    sheet = client.open(SHEET_NAME)
    sheets_to_process = [
        [{'worksheet_name': 'Chinatown-ID', 'sheet': sheet}, process_china_town],
        [{'worksheet_name': 'South-End', 'sheet': sheet}, process_south_end],
        [{'worksheet_name': 'Other Neighborhoods', 'sheet': sheet}, process_other]
    ]

    for process_job in sheets_to_process:
        process_job[1](**process_job[0])

main()