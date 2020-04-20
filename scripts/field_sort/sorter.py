"""Sorts all the giving fields in the columns.json file of all json files within a given directory
"""
import json
import os

from os.path import isfile, join

JSON_DIR = '../../data/restaurants'

def main():
    # Load columns to sort
    columns = []
    with open('columns.json', 'r') as f:
        data = f.read()
        columns = json.loads(data)

    # Get files to sort
    json_files = [os.path.join(JSON_DIR, f) for f in os.listdir(JSON_DIR) if isfile(join(JSON_DIR, f))]

    for file in json_files:
        with open(file, 'r+') as f:
            data = f.read()
            json_object = json.loads(data)

            json_object['restaurants'] = sort_columns(json_object, columns)

            with open(file, 'w+') as w:
                w.write(json.dumps(json_object, indent=4))

def sort_columns(data, columns):
    restaurants = data['restaurants']
    for restaurant in restaurants:
        for key in columns:
            restaurant[key] = sorted(restaurant[key])

    return restaurants

if __name__ == '__main__':
    main()