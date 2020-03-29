from selenium import webdriver
import json

chrome_path = r"chromedriver.exe"
url = input("Enter URL: ")

data = {"restaurants": []}


def scrape(inputurl):
    driver = webdriver.Chrome(chrome_path)
    driver.get(inputurl)
    driver.implicitly_wait(100)

    title = driver.find_element_by_xpath("""//*[@id="ghs-restaurant-summary"]/div/div/div/div[2]/div[1]/h1""")
    types = driver.find_elements_by_xpath("""//*[@id="ghs-restaurant-about"]/div/div[1]/div""")
    phone = driver.find_element_by_xpath(
        """//*[@id="ghs-restaurant-about"]/div/div[2]/div/div/ghs-restaurant-phone/a""")
    price = driver.find_element_by_xpath("""//*[@id="ghs-restaurant-about"]/div/div[1]/ghs-price-rating/div/div[1]""")

    types = types[0].text

    types = types.split(", ")

    data["restaurants"].append({
        "name": title.text,
        "types": types,
        "services": [
            "Delivery Apps"
        ],
        "phone": phone.text,
        "locations": [""],
        "address": "419 6th Ave S, Seattle, WA 98104",
        "website": "",
        "deliveryApps": [
            "GrubHub"
        ],
        "veganOptions": "",
        "price": price.text
    })
    driver.quit()


scrape(url)

json_object = json.dumps(data, indent=4)
with open("restaurants.json", "w") as outfile:
    outfile.write(json_object)
