"use strict";

// Check the details of the API here: https://openweathermap.org/api/air-pollution

import { apiKey } from "../keys.js";

// let checkBackend = async function () {
//   const res = await axios.get("http://localhost:3000/pollMunich");
//   console.log(res);
// };
// checkBackend();

const oneHour = 60 * 60 * 1000;
// setInterval(checkBackend, oneHour);
// push neuesten Quality Index für Linien Chart in Array und speichere (put) im Backend
// dann erstelle neue Linien Chart

// Erstelle polar oder cake Chart statt Tabelle

const btnMunich = document.querySelector(".optMunich");
const btnFam = document.querySelector(".optFaM");
const btnBerlin = document.querySelector(".optBerlin");

const dataSection = document.querySelector(".data");
const dataList = document.querySelectorAll(".pollutionValue");
const infoHeader = document.querySelector(".data span");
let img = document.querySelector(".img-container img");

const inputLat = document.querySelector("#user-lat");
const inputLon = document.querySelector("#user-lon");
const inputBtn = document.querySelector("#ok");

inputBtn.addEventListener("click", function (event) {
  let lat = inputLat.value;
  let lon = inputLon.value;
  infoHeader.textContent = "Lat: " + lat + " Lon: " + lon;
  fetchPollutionData(lat, lon);
});

btnMunich.addEventListener("click", function (event) {
  // infoHeader.textContent = "München";
  fetchPollutionData(Munich.Lat, Munich.Lon);
});

btnFam.addEventListener("click", function (event) {
  // infoHeader.textContent = "Frankfurt am Main";
  fetchPollutionData(FrankfurtAmMain.Lat, FrankfurtAmMain.Lon);
});

btnBerlin.addEventListener("click", function (event) {
  // infoHeader.textContent = "Berlin";
  fetchPollutionData(Berlin.Lat, Berlin.Lon);
});

const Munich = {
  Lon: 11.57959,
  Lat: 48.122101,
};

const FrankfurtAmMain = {
  Lon: 8.680573,
  Lat: 50.112212,
};

const Berlin = {
  Lon: 13.382721,
  Lat: 52.522906,
};

let dataArray = [];

// Show Data
function showData(pollution) {
  let counter = 0;
  for (const key in pollution) {
    // dataList[counter].textContent = pollution[key];
    dataArray[counter] = pollution[key];
    counter++;
  }
  // setImage(pollution);
  console.log(dataArray);
  return dataArray;
}

let setImage = function (pollution) {
  switch (pollution.AirQualityIndex) {
    case 1:
      img.src =
        "https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fHNreXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
      break;
    case 2:
      img.src =
        "https://images.unsplash.com/photo-1597350843493-556aaecdb650?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDl8fHRvd24lMjBmb2d8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
      break;
    case 3:
      img.src =
        "https://images.unsplash.com/photo-1599338299012-cebd5f26f196?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHRvd24lMjBmb2d8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
      break;
    case 4:
      img.src =
        "https://images.unsplash.com/photo-1571148433633-f62d3cdb5eee?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzR8fGZvZyUyMGNpdHl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
      break;
    case 5:
      img.src =
        "https://images.unsplash.com/photo-1564938570611-f618ed26e19b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTF8fHRvd24lMjBmb2d8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
      break;
    default:
      break;
  }
};

const canvas = document.getElementById("chart");
const context = canvas.getContext("2d");

let dataLabels = [
  "CarbonMonoxide",
  "Ammonia",
  "NitrogenMonoxide",
  "NitrogenDioxide",
  "Ozone",
  "CoarseParticulateMatter",
  "FineParticlesMatter",
  "SulphurDioxide",
];
let colorHex = [
  "#00b7ff",
  "#96abff",
  "#adc0d8",
  "#FB3640",
  "#EFCA08",
  "#43AA8B",
  "#00ffd4",
  "#253D5B",
];

let data = [];
let newChart;
let pollution;

// Fetch Data
let fetchPollutionData = async function (lat, lon) {
  clear();

  let apiCall =
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=` +
    apiKey;

  let f = await axios({
    method: "get",
    url: apiCall,
  })
    .then((pollutionDetails) => pollutionDetails.data.list)
    .then((airQ) => airQ[0])
    .then(
      (pollutionDetails) =>
        (pollution = {
          AirQualityIndex: pollutionDetails.main.aqi,
          CarbonMonoxide: pollutionDetails.components.co,
          Ammonia: pollutionDetails.components.nh3,
          NitrogenMonoxide: pollutionDetails.components.no,
          NitrogenDioxide: pollutionDetails.components.no2,
          Ozone: pollutionDetails.components.o3,
          CoarseParticulateMatter: pollutionDetails.components.pm10,
          FineParticlesMatter: pollutionDetails.components.pm2_5,
          SulphurDioxide: pollutionDetails.components.so2,
        })
    )
    .then((pollution) => {
      data = showData(pollution);
      console.log("In fetch function: " + pollution);
    })
    .catch((err) => console.log(err));

  data.shift();
  console.log(data);

  newChart = new Chart(context, {
    type: "pie",
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: colorHex,
        },
      ],
      labels: dataLabels,
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
      },
      plugins: {
        datalabels: {
          color: "#fff",
          anchor: "end",
          align: "start",
          offset: -10,
          borderWidth: 2,
          borderColor: "#fff",
          borderRadius: 25,
          backgroundColor: (context) => {
            return context.dataset.backgroundColor;
          },
          font: {
            weight: "bold",
            size: "10",
          },
          formatter: (value) => {
            return value + " %";
          },
        },
      },
    },
  });
};

let clear = function () {
  while (dataList.firstChild) {
    dataList.removeChild(dataList.lastChild);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  if (newChart != null) {
    newChart.destroy();
  }
};
