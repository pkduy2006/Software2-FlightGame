from flask import Flask, render_template, Response
from flask_cors import CORS
import json
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
@app.route('/player=<player_name>')
def create_user(player_name):
    try:
        sql = """SELECT * FROM user_data WHERE name = %s;"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(sql, (player_name,))
        player = cursor.fetchall()

        if player:
            response = {
                "message": "This user already exists.",
                "status": 200,
            }
            json_response = json.dumps(response)
            http_response = Response(json_response, status=200, mimetype='application/json')
            return http_response
        else:
            try:
                sql = """SELECT airport.name as 'name', airport.iso_country as 'iso_country', airport.municipality as 'municipality', country.name as
                'country', airport.ident as 'ident', airport.latitude_deg as 'latitude_deg', airport.longitude_deg as 'longitude_deg'
                FROM airport, country
                WHERE airport.iso_country = country.iso_country
                AND airport.continent = 'EU'
                AND airport.type = 'large_airport'
                AND airport.iso_country NOT IN (SELECT airport.iso_country FROM airport WHERE iso_country = 'RU')
                ORDER BY RAND()
                LIMIT 40;"""
                cursor.execute(sql)
                airports = cursor.fetchall()
                base = (airports[0]['latitude_deg'], airports[0]['longitude_deg'])
                target = (airports[1]['latitude_deg'], airports[1]['longitude_deg'])
                while geodesic(base, target).km < 2000:
                    random.shuffle(airports)
                    base = (airports[0]['latitude_deg'], airports[0]['longitude_deg'])
                    target = (airports[1]['latitude_deg'], airports[1]['longitude_deg'])
                try:
                    sql = """SELECT * FROM types;"""
                    cursor.execute(sql)
                    types = cursor.fetchall()
                    id = 0
                    for type in types:
                        for i in range(type["total"]):
                            airports[id]["garrison"] = type["garrison"]
                            airports[id]["storage"] = type["storage"]
                            id = id + 1
                    try:
                        user = [player_name]
                        for airport in airports:
                            user.append(airport["ident"])
                        user_tuple = tuple(user)
                        sql = """INSERT INTO user_data(name, base, target, airport3, airport4, airport5, airport6, airport7, airport8, airport9, airport10, airport11, airport12, airport13, airport14, airport15, airport16, airport17, airport18, airport19, airport20, airport21, airport22, airport23, airport24, airport25, airport26, airport27, airport28, airport29, airport30, airport31, airport32, airport33, airport34, airport35, airport36, airport37, airport38, airport39, airport40)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""
                        cursor.execute(sql, user_tuple)
                        response = [
                            {
                                "message": "success",
                                "status": 200
                            },
                            airports
                        ]
                        json_response = json.dumps(response)
                        http_response = Response(json_response, status=200, mimetype='application/json')
                        return http_response
                    except Exception:
                        response = {
                            "message": "failure",
                            "status": 200
                        }
                        json_response = json.dumps(response)
                        http_response = Response(json_response, status=200, mimetype='application/json')
                        return http_response
                except Exception:
                    response = {
                        "message": "There was an error setting airports' attributes.",
                        "status": 500
                    }
                    json_response = json.dumps(response)
                    http_response = Response(json_response, status=500, mimetype='application/json')
                    return http_response
            except Exception:
                response = {
                    "message": "There was an error retrieving airports.",
                    "status": 500
                }
                json_response = json.dumps(response)
                http_response = Response(json_response, status=500, mimetype='application/json')
                return http_response
    except Exception:
        response = {
            "message": "table user_data is not available",
            "status": 500
        }
        json_response = json.dumps(response)
        http_response = Response(json_response, status=500, mimetype='application/json')
        return http_response

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host='127.0.0.1', port=5000)
