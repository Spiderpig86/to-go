"""Scraper for Yelp information given a link. Will also reconcilate and delete YELP_URL field inside restaurant JSON and populate missing fields of restaurants.
"""
import requests, json, re
from bs4 import BeautifulSoup

EXISTING_JSON_PATH = '../../data/restaurants.json'

def main():
    existing_records = None
    with open(EXISTING_JSON_PATH, 'r') as f:
        data = f.read()
        data = json.loads(data)
        data = data['restaurants']
        existing_records = _json_to_map(data, lambda restaurant: 'YELP_URL' in restaurant)

    for _, record in existing_records.items():
        print(existing_records)
        yelp_url = record['YELP_URL']
        _fetch_fields(yelp_url)

def _json_to_map(data, _filter=None):
    res = {}
    for restaurant in data:
        if _filter(restaurant):
            res[restaurant['name']] = restaurant
    return res

def _fetch_fields(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, features='html.parser')

    matched_fields = soup.findAll('script', {"data-hypernova-key" : re.compile(r".*")})
    json_text = matched_fields[len(matched_fields) - 1].text.replace('<!--', '').replace('-->', '')

    fields = json.loads(json_text)
    print(fields)

if __name__ == '__main__':
    main()