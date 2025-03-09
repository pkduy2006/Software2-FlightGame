'use strict';

async function getData(keywords) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/${keywords}`);
        if (!response.ok) throw new Error(`Failed to fetch data from http://127.0.0.1:5000/${keywords}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

const redIcon = L.divIcon({className: 'red-icon'});
const blackIcon = L.divIcon({className: 'black-icon'});

let cur;

async function initializeGame() {
    const playerName = prompt('What is your name?');
    document.querySelector('#player-name').innerHTML = `Name: ${playerName}`;
    document.querySelector('#trip-distance').innerHTML = `Trip: 0 km`;
    document.querySelector('#fuel-status').innerHTML = `Fuel: 1000 L`;
    document.querySelector('#player-mission').innerHTML = 'Mission completed: No';

    const airport_data = await getData('airports');

    document.querySelector('#name-base').innerHTML = `Name: ${airport_data[0].name}`;
    document.querySelector('#municipality-base').innerHTML = `Municipality: ${airport_data[0].municipality}`;
    document.querySelector('#country-base').innerHTML = `Country: ${airport_data[0].country}`;

    document.querySelector('#name-target').innerHTML = `Name: ${airport_data[1].name}`;
    document.querySelector('#municipality-target').innerHTML = `Municipality: ${airport_data[1].municipality}`;
    document.querySelector('#country-target').innerHTML = `Country: ${airport_data[1].country}`;

    document.querySelector('#name-location').innerHTML = `Name: ${airport_data[0].name}`;
    document.querySelector('#municipality-location').innerHTML = `Municipality: ${airport_data[0].municipality}`;
    document.querySelector('#country-location').innerHTML = `Country: ${airport_data[0].country}`;
}

function createMap() {
    const airportMarkers = L.featureGroup().addTo(map);
    for (let i = 0; i < airports.length; i++) {
        const marker = L.marker([airports[i].latitude_deg, airports[i].longitude_deg]).addTo(map);
        airportMarkers.addLayer(marker);
        airports[i].active = true;
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

        }

    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    initializeGame();
    cur = 0;

    const map = L.map('map', {tap: false});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    createMap();
});