"use strict";

//Connecting API SMN
let latitude;
let longitude;

const apiData = "build/scripts/apiSMNData.json";

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

    //The moon information is static beacuse we can´t get the latitude and longitude of searchBar input
    /* well, we coud connect to google maps api to get that information but it asks us for credit card */
    const apiMoon = `https://api.tutiempo.net/json/?lan=es&apid=${apiKey}&ll=${latitude},${longitude}`;

    fetch(apiData)
        .then(respuesta => respuesta.json())
            .then(resultado => {
                console.log(resultado);
                generarHTMLData(resultado, []);
                // generarHTMLDays(resultado, []); //no tiene caso poner otro caso porque puedo poner todo en la misma funcion
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
const windSpeed = document.querySelector("#details__windSpeed"); 
const mainHumidity = document.querySelector("#details__humidity");
const mainName = document.querySelector("#state__info");

const weather = document.querySelector(".state__image");
const weatherCD = document.querySelector("#state__cd");
const weatherMN = document.querySelector("#state__mn");
const stateDay = document.querySelector("#state__day");

//Todays Forecast
const cimage1 = document.querySelector("#card1__img");
const cimage2 = document.querySelector("#card2__img");
const cimage3 = document.querySelector("#card3__img");

const tmax1 = document.querySelector("#tmax1");
const tmin1 = document.querySelector("#tmin1");
const desciel1 = document.querySelector("#desciel1");
const wind1 = document.querySelector("#wind1");
const humidity1 = document.querySelector("#humidity1");

const tmax2 = document.querySelector("#tmax2");
const tmin2 = document.querySelector("#tmin2");
const desciel2 = document.querySelector("#desciel2");
const wind2 = document.querySelector("#wind2");
const humidity2 = document.querySelector("#humidity2");

const tmax3 = document.querySelector("#tmax3");
const tmin3 = document.querySelector("#tmin3");
const desciel3 = document.querySelector("#desciel3");
const wind3 = document.querySelector("#wind3");
const humidity3 = document.querySelector("#humidity3");

//Moon info with API: "tutiempo.net"
const moonIcon = document.querySelector("#moonIcon");
const moonInfo = document.querySelector("#moonInfo");

function generarHTMLData(resultado, array){
    console.log("Tu arreglo: ");
    console.table(array);
    //Bye Loader
    maxTemp.classList.remove("loader");
    minTemp.classList.remove("loader");
    windSpeed.classList.remove("loader");
    mainHumidity.classList.remove("loader");

    let locationFound = getDataLocation(resultado, array);

      //Destructuring to get data from locationFound
      const {nmun, nes, desciel, tmax, tmin, velvien, probprec, dloc} = locationFound;

      //Insert HTML (Main section)
      maxTemp.innerHTML = `${Math.floor(tmax)}ºC`;
      minTemp.innerHTML = `${Math.floor(tmin)}ºC`;
      windSpeed.innerHTML = `${velvien} km/h`;
      mainHumidity.innerHTML = `${Math.floor(probprec)}%`;
      mainName.innerHTML = `${desciel}`;
      weatherCD.innerHTML = `${nmun}, <br><span>${nes}</span>`;

      const localDay = dloc.slice(6,8);
      const localMonth = generateMonth(dloc.slice(4,6));
      const localYear = dloc.slice(0,4);
      stateDay.innerHTML = `${localDay} de ${localMonth} <br>del ${localYear}`;

      imgWheater(desciel, weather);

    //Days Section
    //Destructuring to get JSON DATA
    let day1, day2, day3;
    day1 = getDataDays(resultado, array, 1);
    day2 = getDataDays(resultado, array, 2);
    day3 = getDataDays(resultado, array, 3);

    console.log("Dia 1");
    console.log(day1);
    console.log("Dia 2");
    console.log(day2);
    console.log("Dia 3");
    console.log(day3);

    const tmaxD1 = day1.tmax;
    const tminD1 = day1.tmin;
    const descielD1 = day1.desciel;
    const windD1 = day1.velvien;
    const humidityD1 = day1.probprec;

    const tmaxD2 = day2.tmax;
    const tminD2 = day2.tmin;
    const descielD2 = day2.desciel;
    const windD2 = day1.velvien;
    const humidityD2 = day1.probprec;

    const tmaxD3 = day3.tmax;
    const tminD3 = day3.tmin;
    const descielD3 = day3.desciel;
    const windD3 = day1.velvien;
    const humidityD3 = day1.probprec;

    tmax1.innerHTML = `Max:<br><span>${Math.floor(tmaxD1)}º</span>`;
    tmax2.innerHTML = `Max:<br><span>${Math.floor(tmaxD2)}º</span>`;
    tmax3.innerHTML = `Max:<br><span>${Math.floor(tmaxD3)}º</span>`;

    tmin1.innerHTML = `Min:<br><span>${Math.floor(tminD1)}º</span>`;
    tmin2.innerHTML = `Min:<br><span>${Math.floor(tminD2)}º</span>`;
    tmin3.innerHTML = `Min:<br><span>${Math.floor(tminD3)}º</span>`;

    desciel1.innerHTML = `${descielD1}`;
    desciel2.innerHTML = `${descielD2}`;
    desciel3.innerHTML = `${descielD3}`;

    wind1.innerHTML = `Vel. Viento: <br><span>${windD1} km/h</span>`;
    wind2.innerHTML = `Vel. Viento: <br><span>${windD2} km/h</span>`;
    wind3.innerHTML = `Vel. Viento: <br><span>${windD3} km/h</span>`;

    humidity1.innerHTML = `Prob. de Precipitación: <br><span>${Math.floor(humidityD1)}%</span>`;
    humidity2.innerHTML = `Prob. de Precipitación: <br><span>${Math.floor(humidityD2)}%</span>`;
    humidity3.innerHTML = `Prob. de Precipitación: <br><span>${Math.floor(humidityD3)}%</span>`;

    imgWheater(descielD1, cimage1);
    imgWheater(descielD2, cimage2);
    imgWheater(descielD3, cimage3);
}

function imgWheater(desciel, weather){
  //Weather images
  switch(true){
    case desciel.includes("nublado"):
    case desciel.includes("nuboso"):
    case desciel.includes("nubes"):
    case desciel.includes("cubierto"):
      weather.innerHTML = `<img src="build/img/sunAndCloud.png" alt="Clima">`;
    break;
    case desciel.includes("Despejado"):
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

function getDataLocation(resultado, array){ //This function returns the object according to your location or the location in search bar
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

function getDataDays(resultado, array, numDay){ //This function returns the object according to your location or the location in search bar
  let locationFound = {};
  const tolerance = 0.1;
  let i = 0;
  let res; //return variable

  if(!(array.length === 0)){ //If there is a value in the search-bar
    while(i < array.length){
      switch(i){
        case 0: //Just nmun
          res = resultado.find(element => (normalizeString(element.nmun) == normalizeString(array[i])) && element.ndia == numDay);
          if(
            res === undefined
            ){ //if is an state
            res = resultado.find(element => (normalizeString(element.nes) == normalizeString(array[i])) && element.ndia == numDay);
          }
        break;
        
        case 1: //nmun and nes
          res = resultado.find(element => (normalizeString(element.nmun) == normalizeString(array[i-1])) && normalizeString(element.nes) == normalizeString(array[i]) && element.ndia == numDay);
          if(
            res === undefined
            ){ //Just see the nmun
            res = resultado.find(element => (normalizeString(element.nmun) == normalizeString(array[i-1])) && element.ndia == numDay);
          }
        break;
      }

      if(
            (res === undefined)
        && i == (array.length - 1)){ //If the location isn`t found
        Swal.fire({
          icon: "error",
          title: "Oh no!",
          text: "No encontramos esa ciudad",
          footer: '<p class="textoPequeno">Lo sentimos mucho</p>'
        });
      }
      i++;
    };
  } else{
    res = resultado.find(element => (Math.abs(element.lat - latitude) < tolerance && Math.abs(element.lon - longitude) < tolerance) && element.ndia == numDay);
  }
  return res;
}

//Utilities
function normalizeString(cadena) {
  //We use Regular Expressions (REGEX) to normalize our strings
  return ((cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase()).replace(/\s/g, "");
}

function generateMonth(numMonth){
  switch(numMonth){
    case "1":
      return "Enero";
    break;
    case "2":
      return "Febrero";
    break;
    case "3":
      return "Marzo";
    break;
    case "4":
      return "Abril";
    break;
    case "5":
      return "Mayo";
    break;
    case "6":
      return "Junio";
    break;
    case "7":
      return "Julio";
    break;
    case "8":
      return "Agosto";
    break;
    case "9":
      return "Septiembre";
    break;
    case "10":
      return "Octubre";
    break;
    case "11":
      return "Noviembre";
    break;
    case "12":
      return "Diciembre";
    break;
  }
}