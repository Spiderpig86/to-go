"""Scraper for Yelp information given a link. Will also reconcilate and delete YELP_URL field inside restaurant JSON and populate missing fields of restaurants.
"""
import requests, json, re
from bs4 import BeautifulSoup

EXISTING_JSON_PATH = '../../data/restaurants.json'
MAPPING_FILE_NAME = 'mapping'

# Keys
NAME = 'name'
TYPES = 'types'
SERVICES = 'services'
PHONE = 'phone'
LOCATION = 'location'
LOCATIONS = 'locations'
ADDRESS = 'address'
WEBSITE = 'website'
DELIVERY_APPS = 'deliveryApps'
VEGAN_OPTIONS = 'veganOptions'
PRICE = 'price'

def main():
    existing_records = None
    original_map = None
    with open(EXISTING_JSON_PATH, 'r') as f:
        data = f.read()
        data = json.loads(data)
        data = data['restaurants']
        existing_records, original_map = _json_to_map(data, lambda restaurant: 'YELP_URL' in restaurant)
    
    key_mapping_json = None
    with open(f'./{MAPPING_FILE_NAME}.json', 'r') as f:
        mapping_data = f.read()
        key_mapping_json = json.loads(mapping_data)

    for key, record in existing_records.items():
        yelp_url = record['YELP_URL']
        yelp_fields = _fetch_fields(yelp_url)
        transformed = _transform_fields(yelp_fields, key_mapping_json)

        # Merge fields
        fields_to_merge = [TYPES, LOCATIONS, PRICE] # Modify this

        for fields in fields_to_merge:
            record[fields] = transformed[fields]
            
        del record['YELP_URL']
        original_map[key] = record

    final_json = {
        'restaurants': list(original_map.values())
    }
    
    with open(f'./out/updated_yelp_data.json', 'w+') as f:
        f.write(json.dumps(final_json, indent=4))

    print('Updated Records: ' + str(len(existing_records)))

def _json_to_map(data, _filter=None):
    res = {}
    original = {}
    for restaurant in data:
        if _filter(restaurant):
            res[restaurant['name']] = restaurant
        original[restaurant['name']] = restaurant
    return res, original

def _fetch_fields(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, features='html.parser')

    matched_fields = soup.findAll('script', {"data-hypernova-key" : re.compile(r".*")})
    json_text = matched_fields[len(matched_fields) - 1].text.replace('<!--', '').replace('-->', '')

    fields = json.loads(json_text)
    return fields

def _transform_fields(fields, mapping):
    price = '$' * _drill_down(fields, mapping[PRICE])[1]
    types = _drill_down(fields, mapping[TYPES])[1].split(',')
    types = list(map(lambda t: t.strip().capitalize(), types))

    return {
        NAME: _drill_down(fields, mapping[NAME]),
        TYPES: types,
        SERVICES: ['Curbside/Takeout'],
        PHONE: _drill_down(fields, mapping[PHONE]),
        LOCATIONS: [_drill_down(fields, mapping[LOCATION])],
        ADDRESS: _drill_down(fields, mapping[ADDRESS]),
        WEBSITE: _drill_down(fields, mapping[WEBSITE]),
        DELIVERY_APPS: [],
        VEGAN_OPTIONS: None,
        PRICE: price
    }

def _drill_down(fields, property_string):
    properties = property_string.split('.')
    temp = fields
    for prop in properties:
        if len(prop) == 0:
            continue
        temp = temp[prop]
    return temp

if __name__ == '__main__':
    main()