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

async function initializeGame() {
    const playerName = prompt('What is your name?');
    document.querySelector('#player-name').innerHTML = `Name: ${playerName}`;
    document.querySelector('#trip-distance').innerHTML = `Trip: 0 km`;
    document.querySelector('#fuel-status').innerHTML = `Fuel: 1000 L`;
    document.querySelector('#player-mission').innerHTML = 'Mission completed: No';


    let airport_data = await getData('airports');
    const types = await getData('types');
    let airport_index = 0;
    for (let i of types) {
        for (let j = 0; j < i.total; j++) {
            airport_data[airport_index].garrison = i.garrison;
            airport_data[airport_index].storage = i.storage;
            airport_index++;
        }
    }

    document.querySelector('#name-base').innerHTML = airport_data[0].name;
    document.querySelector('#municipality-base').innerHTML = airport_data[0].municipality;
    document.querySelector('#country-base').innerHTML = airport_data[0].country;

    document.querySelector('#name-target').innerHTML = airport_data[1].name;
    document.querySelector('#municipality-target').innerHTML = airport_data[1].municipality;
    document.querySelector('#country-target').innerHTML = airport_data[1].country;

    document.querySelector('#name-location').innerHTML = airport_data[0].name;
    document.querySelector('#municipality-location').innerHTML = airport_data[0].municipality;
    document.querySelector('#country-location').innerHTML = airport_data[0].country;
}

document.addEventListener('DOMContentLoaded', (event) => {
    initializeGame();
});