import requests 
import json 
import sqlite3

#Connect to the DB
connection = sqlite3.connect('Illness_datacollect_collector.db')
#Make the cursor
cursor = connection.cursor()

#Define the table creation
command3 = """CREATE TABLE IF NOT EXISTS
County_pop_and_illness_table(
county TEXT PRIMARY KEY, 
populationCount INTEGER,
fever_count INTEGER, 
runny_nose_count INTEGER, 
vomit_count INTEGER, 
headache_count INTEGER)"""

#Execute command to create table if it doens't exist
cursor.execute(command3)
connection.commit()
#Create connection to "statistik banken" and get names of the counties and the population
response_API = requests.get('https://api.statbank.dk/v1/data/BY2/JSONSTAT?KOMK=*') 
data = response_API.text 
parse_json = json.loads(data) 
labelTestPrint = parse_json['dataset']['value']
labeltest2 = parse_json['dataset']['dimension']['KOMK']['category']['label']

combinationDict = {}
i = 0
#Combine the retrieved info from the API to a dict
for x, value in labeltest2.items(): 
    
    new_val = value
    new_number = labelTestPrint[i]
    combinationDict[new_number] = new_val
    i += 1


#Replace danish letters
for key, value in combinationDict.items():
   newValue = value.replace("Æ", "Ae").replace("æ", "ae").replace("Ø", "Oe").replace("ø", "oe").replace("Å", "Aa").replace("å", "aa")
   combinationDict[key] = newValue



cursor.execute("SELECT * FROM County_pop_and_illness_table")
notPopulatedTable1 = cursor.fetchall()

#Populate the table if it's not popylated by the counties
if(notPopulatedTable1 == []):   
    for key, value in combinationDict.items():
        zero = 0
        cursor.execute("""INSERT INTO County_pop_and_illness_table VALUES (?,?,?,?,?,?)""", (value, key, zero, zero, zero, zero,))

connection.commit()

#Create flask server and handle get/post
from flask import Flask, request

app = Flask(__name__)

@app.route('/server', methods = ['GET', 'POST'])
def home():
    con = sqlite3.connect('Illness_datacollect_collector.db')
    c = con.cursor()

    if(request.method == 'GET'):
        c.execute("SELECT * FROM County_pop_and_illness_table")
        showTable = str(c.fetchall())
        print("Showing Database")
        return showTable

    if(request.method == 'POST'):
        received_data = request.json
        print("Before data method call")
        for key,value in received_data.items():
            first_value = list(received_data.values())[0]
            print(first_value)
            if(value == "Feber"):
                print(value)
                c.execute("UPDATE County_pop_and_illness_table SET fever_count = fever_count+1 WHERE county = ?", (first_value,))
            elif(value == "Snottet"):
                print(value)
                c.execute("UPDATE County_pop_and_illness_table SET runny_nose_count = runny_nose_count+1 WHERE county = ?", (first_value,))    
            elif(value == "Opkast"):
                print(value)
                c.execute("UPDATE County_pop_and_illness_table SET vomit_count = vomit_count+1 WHERE county = ?", (first_value,))    
            elif(value == "Hovedpine"):
                print(value)
                c.execute("UPDATE County_pop_and_illness_table SET headache_count = headache_count+1 WHERE county = ?", (first_value,))    
            c.execute("SELECT * FROM County_pop_and_illness_table WHERE county = ?", (first_value,))
            results = c.fetchall()
            print(results)
            print("Data received")
            connection.commit()
        return "OK"
    
connection.commit()
#Host is defined by IP because development was done with an Emulator which has limits compared to a real phone
if __name__ == '__main__':
    app.run(host='192.168.20.152')






