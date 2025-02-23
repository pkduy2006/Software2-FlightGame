from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import mysql.connector
connection = mysql.connector.connect(
    host='127.0.0.1',
    port=3306,
    database = 'FlightGame2',
    user='root',
    password='16102006',
    autocommit=True
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    return render_template('game.html')

from geopy.distance import geodesic
import random

@app.route('/airports')
def get_airports():
    sql = """SELECT airport.name as 'name', airport.iso_country as 'iso_country', airport.municipality as 'municipality', country.name as
'country', airport.ident as 'ident', airport.latitude_deg as 'latitude_deg', airport.longitude_deg as 'longitude_deg'
    FROM airport, country
    WHERE airport.iso_country = country.iso_country
    AND airport.continent = 'EU'
    AND airport.type = 'large_airport'
    AND airport.iso_country NOT IN (SELECT airport.iso_country FROM airport WHERE iso_country = 'RU')
    ORDER BY RAND()
    LIMIT 40;"""
    cursor = connection.cursor(dictionary = True)
    cursor.execute(sql)
    result = cursor.fetchall()

    base = (result[0]['latitude_deg'], result[0]['longitude_deg'])
    target = (result[1]['latitude_deg'], result[1]['longitude_deg'])
    while geodesic(base, target).km < 2000:
        random.shuffle(result)
        base = (result[0]['latitude_deg'], result[0]['longitude_deg'])
        target = (result[1]['latitude_deg'], result[1]['longitude_deg'])
    
    return result

@app.route('/types')
def get_types():
    sql ="""SELECT * FROM types;"""
    cursor = connection.cursor(dictionary = True)
    cursor.execute(sql)
    result = cursor.fetchall()
    return result

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host='127.0.0.1', port=5000)
