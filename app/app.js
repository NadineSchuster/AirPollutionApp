"use strict"

// Check the details of the API here: https://openweathermap.org/api/air-pollution
import { apiKey } from "../keys.js";
// Call url to get current air pollution data
//const apiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${dotenv.KEY}`;

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

// Fetch Data
let fetchPollutionData = async function(){
   let apiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${Munich.Lat}&lon=${Munich.Lon}&appid=` + apiKey;
   try{
        const response = await fetch(apiCall);
        const pollutionData = await response.json();
        console.log(pollutionData);
    } catch (error) {
      console.log(error);
    }
}
fetchPollutionData();