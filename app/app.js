"use strict"

// Check the details of the API here: https://openweathermap.org/api/air-pollution

import { apiKey } from "../keys.js";

const btnMunich = document.querySelector('.optMunich');
const btnFam = document.querySelector('.optFaM');
const btnBerlin = document.querySelector('.optBerlin');

const dataSection = document.querySelector('.data');

btnMunich.addEventListener("click", function(event) {
    fetchPollutionData(Munich.Lat, Munich.Lon);
});

btnFam.addEventListener("click", function(event) {
    fetchPollutionData(FrankfurtAmMain.Lat, FrankfurtAmMain.Lon);
});

btnBerlin.addEventListener("click", function(event) {
    fetchPollutionData(Berlin.Lat, Berlin.Lon);
});

const Munich = {
    Lon: 11.579590,
    Lat: 48.122101
}

const FrankfurtAmMain = {
    Lon: 8.680573,
    Lat: 50.112212
}

const Berlin = {
    Lon: 13.382721,
    Lat: 52.522906
}

// Show Data
let showData = function(pollutionData){
    const pollution = pollutionData.list[0];
    console.log(pollution.main);
    console.log(pollution.components);
}

// Fetch Data
let fetchPollutionData = async function(lat, lon){
   let apiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=` + apiKey;
   try{
        const response = await fetch(apiCall);
        const pollutionData = await response.json();
        console.log(pollutionData);
        showData(pollutionData);
    } catch (error) {
        console.log(error);
    }
}