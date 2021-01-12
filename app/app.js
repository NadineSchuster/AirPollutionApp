"use strict"

// Check the details of the API here: https://openweathermap.org/api/air-pollution

import { apiKey } from "../keys.js";

const btnMunich = document.querySelector('.optMunich');
const btnFam = document.querySelector('.optFaM');
const btnBerlin = document.querySelector('.optBerlin');

const dataSection = document.querySelector('.data');
const dataList = document.querySelectorAll('.pollutionValue');
const infoHeader = document.querySelector('.data span');

btnMunich.addEventListener("click", function(event) {
    clear();
    infoHeader.textContent = "München";
    fetchPollutionData(Munich.Lat, Munich.Lon);
});

btnFam.addEventListener("click", function(event) {
    clear();
    infoHeader.textContent = "Frankfurt am Main";
    fetchPollutionData(FrankfurtAmMain.Lat, FrankfurtAmMain.Lon);
});

btnBerlin.addEventListener("click", function(event) {
    clear();
    infoHeader.textContent = "Berlin";
    fetchPollutionData(Berlin.Lat, Berlin.Lon);
});

// Dynamisches hinzufügen von Key und value...
// ...sodass es immer stimmt, auch wenn die Reihenfolge abweicht
// Hinzufügen der Stadt im Header
// Durch die Buttons durchitterieren
// Values im html so hinzufügen where value-name === key-name
// Die Card sollte nicht der body sein Q_Q

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
let showData = function(pollution){
    let counter = 0;
    for(const key in pollution){
        dataList[counter].textContent = pollution[key]
        counter++;
    }
}

// Fetch Data
let fetchPollutionData = async function(lat, lon){
   let apiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=` + apiKey;
   try{
        const response = await fetch(apiCall);
        const pollutionData = await response.json();
        console.log(pollutionData);

        const pollutionDetails = pollutionData.list[0];
        console.log(pollutionDetails);

        const airQuality = pollutionDetails.main;
        console.log(airQuality.aqi);

        const pollution = {
            AirQualityIndex: airQuality.aqi,
            CarbonMonoxide: pollutionDetails.components.co,
            Ammonia: pollutionDetails.components.nh3,
            NitrogenMonoxide: pollutionDetails.components.no,
            NitrogenDioxide: pollutionDetails.components.no2,
            Ozone: pollutionDetails.components.o3,
            CoarseParticulateMatter: pollutionDetails.components.pm10,
            FineParticlesMatter: pollutionDetails.components.pm2_5,
            SulphurDioxide: pollutionDetails.components.so2,
        }
        console.log(pollution);

        showData(pollution);

    } catch (error) {
        console.log(error);
    }
}

let clear = function() {
    while (dataList.firstChild) {
    dataList.removeChild(dataList.lastChild);
  }
}