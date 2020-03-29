from selenium import webdriver

chrome_path = r"chromedriver.exe"
url = input("Enter URL: ")


def scrape(inputurl):
    driver = webdriver.Chrome(chrome_path)
    driver.get(inputurl)
    driver.implicitly_wait(100)

    title = driver.find_element_by_xpath("""//*[@id="ghs-restaurant-summary"]/div/div/div/div[2]/div[1]/h1""")
    types = driver.find_elements_by_xpath("""//*[@id="ghs-restaurant-about"]/div/div[1]/div""")
    phone = driver.find_element_by_xpath(
        """//*[@id="ghs-restaurant-about"]/div/div[2]/div/div/ghs-restaurant-phone/a""")
    price = driver.find_element_by_xpath("""//*[@id="ghs-restaurant-about"]/div/div[1]/ghs-price-rating/div/div[1]""")

    print(title.text)

    for typeOf in types:
        print(typeOf.text)

    print(phone.text)
    print(price.text)

    driver.quit()


scrape(url)
