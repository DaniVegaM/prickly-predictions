"use strict";

//Connecting API SMN
let latitude;
let longitude;

const apiData = "build/scripts/apiSMNData.json";
const apiDays = "build/scripts/apiSMNDays.json";

//Connecting API tuTiempo.net for the Moon API
let apiKey = "qxEz4qazaXatWd2";

//Detect automatically your current location
window.addEventListener("load", currentLocation);

//Event Listener for Search-Bar
const searchBar = document.querySelector("#search__input");
const searchIcon = document.querySelector("#search__image");

searchIcon.addEventListener('click', event =>{ //If the user clicks on the loupe
    event.preventDefault();
    searchLocation();
});
searchBar.addEventListener('keyup', event =>{ //Ïf the user push "Enter"
    if (event.keyCode === 13){
      event.preventDefault();
      searchLocation();
    }
});

function searchLocation(){
    //Divide string to search easier all the references in the SMN API
    const stringArray = searchBar.value.split(", ");
    fetch(apiData).then(respuesta => respuesta.json()).then(resultado => {
      generarHTMLData(resultado, stringArray);
    });
    fetch(apiDays).then(respuesta => respuesta.json()).then(resultado => {
      generarHTMLDays(resultado, stringArray);
    });
}

//Tracking your Current Location
function currentLocation(){ //Get Latitude and Longitude
    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            console.log("Ya te encontramos con tu ubicacion real");
            consultApi();

        }, (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.log("Acceso denegado por el usuario");

              //Sweet Alert
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No tenemos acceso a tu ubicación",
                footer: '<p class="textoPequeno">Lo sentimos mucho</p>'
              });
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Ubicacion no disponible");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No tenemos acceso a tu ubicación",
                footer: '<p class="textoPequeno">Lo sentimos mucho</p>'
              });
              break;
            case error.TIMEOUT:
              console.log("Se acabo el tiempo para obtener la ubicacion");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No tenemos acceso a tu ubicación",
                footer: '<p class="textoPequeno">Lo sentimos mucho</p>'
              });
              break;
            case error.UNKNOWN_ERROR:
              console.log("Algo salió mal");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No tenemos acceso a tu ubicación",
                footer: '<p class="textoPequeno">Lo sentimos mucho</p>'
              });
              break;
          }

          //Check API
          console.log("No te encontramos, simulemos que sí");
          //Establecemos coordenadas fijas para que aunque sea se muestre algo
          latitude = "19.4841";
          longitude = "-99.1844";
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No tenemos acceso a tu ubicación",
            footer: '<p class="textoPequeno">Lo sentimos mucho</p>'
          });
          consultApi();
        });
    } else {
        //Check API
        console.log("Tu navegador no soporta acceder a tu ubicacion");
        //Establecemos coordenadas fijas para que aunque sea se muestre algo
        latitude = "19.4841";
        longitude = "-99.1844";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No tenemos acceso a tu ubicación",
          footer: '<p class="textoPequeno">Lo sentimos mucho</p>'
        });
        consultApi();
    }      
}

function consultApi(){ //Get data from API
    console.log("Consultando API");

    const apiMoon = `https://api.tutiempo.net/json/?lan=es&apid=${apiKey}&ll=${latitude},${longitude}`;

    fetch(apiData)
        .then(respuesta => respuesta.json())
            .then(resultado => {
                console.log(resultado);
                generarHTMLData(resultado, []);
            })
                    .catch(error => console.error("Error al obtener datos del clima:", error));
    fetch(apiDays)
        .then(respuesta => respuesta.json())
            .then(resultado => {
                console.log(resultado);
                generarHTMLDays(resultado, []);
            })
                    .catch(error => console.error("Error al obtener datos del clima:", error));
    
    fetch(apiMoon)
        .then(respuesta => respuesta.json())
            .then(resultado => {
                console.log(resultado);
                generarHTMLMoon(resultado);
            })
                    .catch(error => console.error("Error al obtener datos del clima:", error));
}

const maxTemp = document.querySelector("#maximum-value");
const minTemp = document.querySelector("#minimum-value");
const mainTemp = document.querySelector("#details__temperature");
const windSpeed = document.querySelector("#details__windSpeed"); 
const mainHumidity = document.querySelector("#details__humidity");
const mainName = document.querySelector("#state__info");

const weather = document.querySelector(".state__image");
const weatherCD = document.querySelector("#state__cd");
const weatherMN = document.querySelector("#state__mn");

//Todays Forecast
const hour = document.querySelector(".card__hour");

//Moon info with API: "tutiempo.net"
const moonIcon = document.querySelector("#moonIcon");
const moonInfo = document.querySelector("#moonInfo");

function generarHTMLData(resultado, array){
    console.log("Tu arreglo: ");
    console.table(array);
    //Bye Loader
    maxTemp.classList.remove("loader");
    minTemp.classList.remove("loader");
    mainTemp.classList.remove("loader");
    windSpeed.classList.remove("loader");
    mainHumidity.classList.remove("loader");

    let locationFound = getDataLocation(resultado, array);

    //Destructuring to get JSON DATA
    // console.log("Latitud :" + latitude);
    // console.log("Longitud :" + longitude);

      //Destructuring to get data from locationFound
      const {nmun, nes, desciel, tmax, tmin, velvien} = locationFound;

      //Inesert HTML
      maxTemp.innerHTML = `${tmax}ºC`;
      minTemp.innerHTML = `${tmin}ºC`;
      windSpeed.innerHTML = `${velvien} km/h`;
      mainName.innerHTML = `${desciel}`;
      weatherCD.innerHTML = `${nmun}, <br><span>${nes}</span>`;

      //Weather images
     switch(true){
      case desciel.includes("nublado"):
      case desciel.includes("nuboso"):
      case desciel.includes("nubes"):
        weather.innerHTML = `<img src="build/img/sunAndCloud.png" alt="Clima">`;
      break;
      case desciel.includes("despejado"):
      case desciel.includes("limpio"):
      case desciel.includes("soleado"):
      case desciel.includes("sol"):
        weather.innerHTML = `<img src="build/img/sun.png" alt="Clima">`;
      break;
      case desciel.includes("lluvia"):
      case desciel.includes("lluvioso"):
      case desciel.includes("chubascos"):
      case desciel.includes("chubascoso"):
        weather.innerHTML = `<img src="build/img/rain.png" alt="Clima">`;
      break;
      case desciel.includes("tormenta"):
      case desciel.includes("electrica"):
      case desciel.includes("electrico"):
        weather.innerHTML = `<img src="build/img/electricStorm.png" alt="Clima">`;
      break;
      case desciel.includes("nevado"):
      case desciel.includes("nieve"):
        weather.innerHTML = `<img src="build/img/snow.png" alt="Clima">`;
      break;
      case desciel.includes("viento"):
      case desciel.includes("ventoso"):
        weather.innerHTML = `<img src="build/img/wind.png" alt="Clima">`;
      break;
      case desciel.includes("tornado"):
        case desciel.includes("vientos fuertes"):
        weather.innerHTML = `<img src="build/img/tornado.png" alt="Clima">`;
      break;
    }
}

function generarHTMLDays(resultado, array){
  //Destructuring to get JSON DATA
  let i;
  // console.log("Latitud :" + latitude);
  // console.log("Longitud :" + longitude);

  let locationFound = getDataLocation(resultado, array);
    // console.log("Sí está");
    // console.log(locationFound);

    //Destructuring to get data from locationFound
    const {temp, hr} = locationFound;
    // console.log("La temperatura es: " + temp);
    
    //Insert HTML
    mainTemp.innerHTML = `${temp}ºC`;
    mainHumidity.innerHTML = `${hr}%`;
}

function generarHTMLMoon(resultado){
  moonInfo.classList.remove("loader");
  const {day1:{moon_phases_icon}} = resultado;
  //Moon Phases
    //The moon phases are between 1 and 29
    switch(moon_phases_icon){
      case ("1"):
      case("2"):
      case("3"):
      case("4"):
      case("29"):
      case("26"):
      case("27"):
      case("28"):
        moonIcon.innerHTML = `<img src="build/img/newMoon.svg" alt="moon">`;
        moonInfo.innerHTML = "Luna Nueva";
      break;
      case ("23"):
      case("24"):
      case("25"):
        moonIcon.innerHTML = `<img src="build/img/crescient1.svg" alt="moon">`;
        moonInfo.innerHTML = "Luna Creciente";
        break;
      case ("5"):
      case("6"):
        moonIcon.innerHTML = `<img src="build/img/crescient2.svg" alt="moon">`;
        moonInfo.innerHTML = "Luna Creciente";
      break;
      case ("21"):
      case("22"):
        moonIcon.innerHTML = `<img src="build/img/lastquarter.svg" alt="moon">`;
        moonInfo.innerHTML = "Ultimo Cuarto";
      break;
      case ("7"):
      case("8"):  
        moonIcon.innerHTML = `<img src="build/img/firstquarter.svg" alt="moon">`;
        moonInfo.innerHTML = "Primer Cuarto";
      break;
      case ("18"):
      case("19"):
      case("20"):
        moonIcon.innerHTML = `<img src="build/img/wmoon1.svg" alt="moon">`;
        moonInfo.innerHTML = "Gibosa Iluminante";
      break;
      case ("9"):
      case("10"):
      case("11"):
        moonIcon.innerHTML = `<img src="build/img/wmoon2.svg" alt="moon">`;
        moonInfo.innerHTML = "Gibosa Iluminante";
      break;
      case ("12"):
        case("13"):
        case("14"):
        case("15"):
        case("16"):
        case("17"):
        moonIcon.innerHTML = `<img src="build/img/moon.png" alt="moon">`;
        moonInfo.innerHTML = "Luna Llena";
      break;
    }
}

function getDataLocation(resultado, array){
  let locationFound = {};
  const tolerance = 0.1;
  let i = 0;

  if(!(array.length === 0)){ //If there is a value in the search-bar
    while(i < array.length){
      switch(i){
        case 0: //Just nmun
          locationFound = resultado.find(element => normalizeString(element.nmun) == normalizeString(array[i]));
          if(locationFound === undefined){
            locationFound = resultado.find(element => normalizeString(element.nes) == normalizeString(array[i]));
          }
        break;
        
        case 1: //nmun and nes
          locationFound = resultado.find(element => normalizeString(element.nmun) == normalizeString(array[i-1]) && normalizeString(element.nes) == normalizeString(array[i]));
          if(locationFound === undefined){ //Just see the nmun
            locationFound = resultado.find(element => normalizeString(element.nmun) == normalizeString(array[i-1]));
          }
        break;
      }

      if(locationFound === undefined && i == (array.length - 1)){ //If the location isn`t found
        Swal.fire({
          icon: "error",
          title: "Oh no!",
          text: "No encontramos esa ciudad",
          footer: '<p class="textoPequeno">Lo sentimos mucho</p>'
        });
        return undefined;
      } else{
        return locationFound;
      }
      i++;
    };
  } else{
    locationFound = resultado.find(element => Math.abs(element.lat - latitude) < tolerance && Math.abs(element.lon - longitude) < tolerance);
    if(locationFound === undefined){
      return undefined;
    } else{
      return locationFound;
    }
  }
  console.log("Datos de la API de la ubicación dinamica");
  console.log("LocationFound es: ");
  console.log(locationFound);
}

//Utilities
function normalizeString(cadena) {
  //We use Regular Expressions (REGEX) to normalize our strings
  return ((cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase()).replace(/\s/g, "");
}