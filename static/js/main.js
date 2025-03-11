'use strict';

const redIcon = L.divIcon({className: 'red-icon'});
const blackIcon = L.divIcon({className: 'black-icon'});

let cur = 0;
const map = L.map('map', {tap: false});
const airportMarkers = L.featureGroup().addTo(map);
let currentFuel = 1000;
let currentTrip = 0;
let currentBonus = 0;
let killedEnemies = 0;
let airports;

function degreesToRadians(degrees)  {
  return degrees * Math.PI / 180;
}

function calDis(lat1, lon1, lat2, lon2)  {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(earthRadiusKm * c);
}

function checkLose() {
    for (let i = 0; i < airports.length; i++) {
        if (cur !== i && airports[i].active) {
            const dis = calDis(airports[cur].latitude_deg, airports[cur].longitude_deg, airports[i].latitude_deg, airports[i].longitude_deg);
            if (dis <= currentFuel * 2)
                return false;
        }
    }
    return true;
}

function createMap() {
    for (let i = 0; i < airports.length; i++) {
        const marker = L.marker([airports[i].latitude_deg, airports[i].longitude_deg]).addTo(map);
        airportMarkers.addLayer(marker);
        if (i === 0)
            marker.setIcon(redIcon);
        if (i === 1)
            marker.setIcon(blackIcon);

        if(i === cur) {
            marker.bindPopup(`You are here <b>${airports[i].name}</b>`);
            marker.openPopup();
        } else {
            const div = document.createElement('div');
            const h4 = document.createElement('h4');
            h4.innerHTML = airports[i].name;
            div.append(h4);
            const p = document.createElement('p');
            if (!airports[i].active)
                p.innerHTML = 'Unavailable';
            else {
                let dis = calDis(airports[cur].latitude_deg, airports[cur].longitude_deg, airports[i].latitude_deg, airports[i].longitude_deg);
                p.innerHTML = `Distance: ${dis} km`;
                div.append(p);
                const button = document.createElement('button');
                button.innerHTML = 'Fly here.';
                div.append(button);
                marker.bindPopup(div);
                div.addEventListener('click', async function () {
                    if (dis <= currentFuel * 2) {
                        currentFuel -= Math.round(dis / 2);
                        currentTrip += Math.round(dis);
                        cur = i;
                        document.querySelector('#trip-distance').innerHTML = `Trip: ${currentTrip} km`;
                        document.querySelector('#fuel-status').innerHTML = `Fuel: ${currentFuel} L`;
                        document.querySelector('#name-location').innerHTML = `Name: ${airports[cur].name}`;
                        document.querySelector('#municipality-location').innerHTML = `Municipality: ${airports[cur].municipality}`;
                        document.querySelector('#country-location').innerHTML = `Country: ${airports[cur].country}`;
                        alert(`Welcome to ${airports[cur].name}`);

                        if (cur === 1) {
                            alert('You arrived at your target. Destroy it');
                            airports[cur].active = false;
                            currentBonus += 50;
                            document.querySelector('#player-bonus').innerHTML = `Bonus: ${playerBonus}%`;
                            document.querySelector('#player-mission').innerHTML = 'Mission completed: Yes';
                        } else if(cur === 0) {
                            if (airports[1].active === false)
                                alert('Welcome home our greatest hero!');
                            else
                                alert('Your mission is failed');
                        } else {
                            const land = confirm('Do you want to land at this airport?');
                            if (land) {
                                if (airports[cur].storage > 0) {
                                    currentFuel += Math.round(airports[cur].storage * (currentBonus / 100) + 1);
                                    alert(`Congratulations! You have found ${airports[cur].storage} litres of gasoline here`);
                                    document.querySelector('#fuel-status').innerHTML = `Fuel: ${airports[cur].storage} L`;
                                    airports[cur].storage = 0;
                                } else {
                                    alert('Damn, there is no fuels at here');
                                }
                                if (airports[cur].garrison > 0) {
                                    alert('Damn, enemies found your aircraft and your fuel was stolen');
                                    currentFuel = Math.round(currentFuel / 2);
                                    document.querySelector('#fuel-status').innerHTML = `Fuel: ${currentFuel} L`;
                                }
                            } else {
                                const destroy = confirm('Do you want to destroy airport?');
                                if (destroy) {
                                    airports[cur].active = false;
                                    if (airports[cur].garrison > 0) {
                                        killedEnemies += airports[cur].garrison;
                                        alert(`Nice! You killed ${airports[cur].garrison} enemies.`);
                                        while (killedEnemies >= 1000) {
                                            killedEnemies -= 1000;
                                            currentBonus += 20;
                                        }
                                        alert(`Now your bonus is  ${currentBonus}%.`);
                                        document.querySelector('#player-bonus').innerHTML = `Bonus: ${currentBonus}%`;
                                    } else
                                        alert('Damn, we killed nothing.');
                                } else {
                                    alert(`Let's continue the journey.`);
                                }
                            }
                        }
                        if(checkLose()) {
                            alert('You cannot travel to any other airport and you lost.');
                        } else {
                            airportMarkers.clearLayers();
                            createMap();
                        }
                    } else
                        alert('You do not have enough fuel to come to this airport. Please choose another airport.')
                });
            }
            marker.bindPopup(div);
        }

    }
}

document.addEventListener('DOMContentLoaded', async (event) => {
    let playerName = prompt('What is your name?');
    document.querySelector('#player-name').innerHTML = `Name: ${playerName}`;
    document.querySelector('#trip-distance').innerHTML = `Trip: 0 km`;
    document.querySelector('#fuel-status').innerHTML = `Fuel: 1000 L`;
    document.querySelector('#player-mission').innerHTML = 'Mission completed: No';

    try {
        let response = await fetch(`http://127.0.0.1:5000/player=${playerName}`);
        if (!response.ok) throw new Error(`Failed to fetch player: ${playerName}`);
        let data = await response.json();
        while (data.message === "failure") {
            alert('Your name is already taken!. Please choose another name.');
            playerName = prompt('What is your name?');
            try {
                response = await fetch(`http://127.0.0.1:5000/player=${playerName}`);
                if (!response.ok) throw new Error(`Failed to fetch player: ${playerName}`);
                data = await response.json();
            } catch (error) {
                console.log(error.message);
            }
        }
        airports = data[1];
        document.querySelector('#name-base').innerHTML = `Name: ${airports[0].name}`;
        document.querySelector('#municipality-base').innerHTML = `Municipality: ${airports[0].municipality}`;
        document.querySelector('#country-base').innerHTML = `Country: ${airports[0].country}`;

        document.querySelector('#name-target').innerHTML = `Name: ${airports[1].name}`;
        document.querySelector('#municipality-target').innerHTML = `Municipality: ${airports[1].municipality}`;
        document.querySelector('#country-target').innerHTML = `Country: ${airports[1].country}`;

        document.querySelector('#name-location').innerHTML = `Name: ${airports[0].name}`;
        document.querySelector('#municipality-location').innerHTML = `Municipality: ${airports[0].municipality}`;
        document.querySelector('#country-location').innerHTML = `Country: ${airports[0].country}`;

        for (let airport of airports)
            airport.active = true;

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        map.setView([airports[0].latitude_deg, airports[0].latitude_deg], 5);
        createMap();

    } catch (error) {
        console.log(error.message);
    }
});