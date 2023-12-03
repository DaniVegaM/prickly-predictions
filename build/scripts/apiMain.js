"use strict"

const apiData = "build/scripts/apiSMNData.json";

window.addEventListener("load", ()=>{
    fetch(apiData)
        .then(respuesta => respuesta.json())
            .then(resultado => {
                console.log(resultado);
                generarHTMLMain(resultado);
              })
                    .catch(error => console.error("Error al obtener datos del clima:", error));
});

const weatherContainer = document.querySelector("#todosClimasGrid");
const estadoTitle = document.querySelector("#estado__title");
const loadMoreBtn = document.querySelector("#loadMore");

let arrayStatesGeneral = [];

function generarHTMLMain(resultado) {
    console.log("Generando HTML del Main");

    //Create fragment of the document
    const fragment = document.createDocumentFragment();
    const fragment2 = document.createDocumentFragment();

    let arrayStates = [];

    arrayStates[0] = resultado.filter(element=>{
        return element.nes === "Aguascalientes";
    });
    arrayStates[1] = resultado.filter(element=>{
        return element.nes === "Baja California";
    });
    arrayStates[2] = resultado.filter(element=>{
        return element.nes === "Baja California Sur";
    });
    arrayStates[3] = resultado.filter(element=>{
        return element.nes === "Campeche";
    });
    arrayStates[4] = resultado.filter(element=>{
        return element.nes === "Chiapas";
    });
    arrayStates[5] = resultado.filter(element=>{
        return element.nes === "Chihuahua";
    });
    arrayStates[6] = resultado.filter(element=>{
        return element.nes === "Coahuila";
    });
    arrayStates[7] = resultado.filter(element=>{
        return element.nes === "Colima";
    });
    arrayStates[8] = resultado.filter(element=>{
        return element.nes === "Ciudad de México";
    });
    arrayStates[9] = resultado.filter(element=>{
        return element.nes === "Durango";
    });
    arrayStates[10] = resultado.filter(element=>{
        return element.nes === "Estado de México";
    });
    arrayStates[11] = resultado.filter(element=>{
        return element.nes === "Guanajuato";
    });
    arrayStates[12] = resultado.filter(element=>{
        return element.nes === "Guerrero";
    });
    arrayStates[13] = resultado.filter(element=>{
        return element.nes === "Hidalgo";
    });
    arrayStates[14] = resultado.filter(element=>{
        return element.nes === "Jalisco";
    });
    arrayStates[15] = resultado.filter(element=>{
        return element.nes === "Michoacán de Ocampo";
    });
    arrayStates[16] = resultado.filter(element=>{
        return element.nes === "Morelos";
    });
    arrayStates[17] = resultado.filter(element=>{
        return element.nes === "Nayarit";
    });
    arrayStates[18] = resultado.filter(element=>{
        return element.nes === "Nuevo León";
    });
    arrayStates[19] = resultado.filter(element=>{
        return element.nes === "Oaxaca";
    });
    arrayStates[20] = resultado.filter(element=>{
        return element.nes === "Puebla";
    });
    arrayStates[21] = resultado.filter(element=>{
        return element.nes === "Querétaro de Arteaga";
    });
    arrayStates[22] = resultado.filter(element=>{
        return element.nes === "Quintana Roo";
    });
    arrayStates[23] = resultado.filter(element=>{
        return element.nes === "San Luis Potosí";
    });
    arrayStates[24] = resultado.filter(element=>{
        return element.nes === "Sinaloa";
    });
    arrayStates[25] = resultado.filter(element=>{
        return element.nes === "Sonora";
    });
    arrayStates[26] = resultado.filter(element=>{
        return element.nes === "Tabasco";
    });
    arrayStates[27] = resultado.filter(element=>{
        return element.nes === "Tamaulipas";
    });
    arrayStates[28] = resultado.filter(element=>{
        return element.nes === "Tlaxcala";
    });
    arrayStates[29] = resultado.filter(element=>{
        return element.nes === "Veracruz de Ignacio de la Llave";
    });
    arrayStates[30] = resultado.filter(element=>{
        return element.nes === "Yucatán";
    });
    arrayStates[31] = resultado.filter(element=>{
        return element.nes === "Zacatecas";
    });

    arrayStatesGeneral = arrayStates;

    const select = document.querySelector("#selectState");

    let option = 999;

    
    //Load the first time
    generarHTMLDinamico("A", fragment, fragment2, option);

    loadMoreBtn.addEventListener("click", ()=>{
        console.log("El numero de clicks es: " + clickCount);
        
        generarHTMLDinamico("B", fragment, fragment2, option);
    });

    select.addEventListener("change", ()=>{
        if(select.value != option){
            option = select.value;

            generarHTMLDinamico("A", fragment, fragment2, option);

            loadMoreBtn.addEventListener("click", ()=>{
                console.log("El numero de clicks es: " + clickCount);
                
                generarHTMLDinamico("B", fragment, fragment2, option);
            });
        }
        option = select.value;
        console.log("opcion seleccionada: " + select.value);
    });
}

function imgWheater(desciel){
    //Weather images
    switch(true){
      case desciel.includes("nublado"):
      case desciel.includes("nuboso"):
      case desciel.includes("nubes"):
      case desciel.includes("cubierto"):
        return `<img src="build/img/sunAndCloud.png" alt="Clima" loading="lazy">`;
      break;
      case desciel.includes("Despejado"):
      case desciel.includes("limpio"):
      case desciel.includes("soleado"):
      case desciel.includes("sol"):
        return `<img src="build/img/sun.png" alt="Clima" loading="lazy">`;
      break;
      case desciel.includes("lluvia"):
      case desciel.includes("lluvioso"):
      case desciel.includes("chubascos"):
      case desciel.includes("chubascoso"):
        return `<img src="build/img/rain.png" alt="Clima" loading="lazy">`;
      break;
      case desciel.includes("tormenta"):
      case desciel.includes("electrica"):
      case desciel.includes("electrico"):
        return `<img src="build/img/electricStorm.png" alt="Clima" loading="lazy">`;
      break;
      case desciel.includes("nevado"):
      case desciel.includes("nieve"):
        return `<img src="build/img/snow.png" alt="Clima" loading="lazy">`;
      break;
      case desciel.includes("viento"):
      case desciel.includes("ventoso"):
        return `<img src="build/img/wind.png" alt="Clima" loading="lazy">`;
      break;
      case desciel.includes("tornado"):
        case desciel.includes("vientos fuertes"):
        return `<img src="build/img/tornado.png" alt="Clima" loading="lazy">`;
      break;
    }
}

let start = 0;
let end = 0;
let numState = 0;
const elementsByPage = 12;
let numElements = 1;
let clickCount = 0;

function generarHTMLDinamico(which, fragment, fragment2, numStateLocal){

    if(which == "A"){
        start = 0;
        end = elementsByPage;
    } else{
        start = (clickCount * elementsByPage) + 1;
        end = start + elementsByPage;
    }

    let whichState = 0;
    if(numStateLocal == 999){
        whichState = numState;
        loadMoreBtn.classList.remove("invisible");
    } else{
            whichState = numStateLocal;
            clickCount = 0;
            weatherContainer.innerHTML = ``;
            loadMoreBtn.classList.add("invisible");
    }

    // console.log("El arrayStates es: " + arrayStatesGeneral[1]);

    //Execute a state
    // console.log("Cargando HTML");
    console.log("El num de Estado es: " + whichState);
    if(clickCount == 0){
        var stateTitle = document.createElement('div');
        stateTitle.className = 'state__title';
        stateTitle.innerHTML = `<h3 class="color">${arrayStatesGeneral[whichState][0].nes}</h3>`;
        
        fragment2.appendChild(stateTitle);
        weatherContainer.appendChild(fragment2);
    }

    console.log("start vale: " + start + " y end vale: " + end + " y clickCount vale: " + clickCount);

    if(whichState == numState){
        arrayStatesGeneral[whichState].slice(start, end).forEach(element => {
            numElements++;
    
            console.log("Acabo de entrar a generar card de municipio");
    
            var card = document.createElement('div');
            card.className = 'todosClimas__card';
            card.innerHTML = `
            <div class="todosClimas__card">
                <h2 class="card__tittle">${element.nmun}</h2>
                <h3 id="climaDesciel" class="card__descripcion">${element.desciel}</h3>
                <div id="climaImg" class="card__image">
                    ${imgWheater(element.desciel)}
                </div>
                <div class="card__flex">
                    <div class="card__inside">
                        <p id="clima__tmax" class="card__grades-Max">Max:<br><span>${Math.floor(element.tmax)}º</span></p>
                        <p id="clima__tmin" class="card__grades-Min">Min:<br><span>${Math.floor(element.tmin)}º</span></p>
                    </div>
                    <div class="card__inside">
                        <p id="clima__wind" class="card__grades-Max">Vel. Viento: <br><span>${element.velvien} km/h</span></p>
                        <p id="clima__humidity" class="card__grades-Min">Prob. de Precipitación: <br><span>${Math.floor(element.probprec)}%</span></p>
                    </div>
                </div>
            </div>
            `;
    
            fragment.appendChild(card);
        });
    } else{
        arrayStatesGeneral[whichState].forEach(element => {
            numElements++;
    
            console.log("Acabo de entrar a generar card de municipio");
    
            var card = document.createElement('div');
            card.className = 'todosClimas__card';
            card.innerHTML = `
            <div class="todosClimas__card">
                <h2 class="card__tittle">${element.nmun}</h2>
                <h3 id="climaDesciel" class="card__descripcion">${element.desciel}</h3>
                <div id="climaImg" class="card__image">
                    ${imgWheater(element.desciel)}
                </div>
                <div class="card__flex">
                    <div class="card__inside">
                        <p id="clima__tmax" class="card__grades-Max">Max:<br><span>${Math.floor(element.tmax)}º</span></p>
                        <p id="clima__tmin" class="card__grades-Min">Min:<br><span>${Math.floor(element.tmin)}º</span></p>
                    </div>
                    <div class="card__inside">
                        <p id="clima__wind" class="card__grades-Max">Vel. Viento: <br><span>${element.velvien} km/h</span></p>
                        <p id="clima__humidity" class="card__grades-Min">Prob. de Precipitación: <br><span>${Math.floor(element.probprec)}%</span></p>
                    </div>
                </div>
            </div>
            `;
    
            fragment.appendChild(card);
        });
    }

    weatherContainer.appendChild(fragment);

    if(end >= (arrayStatesGeneral[numState].length)){
        numState++;
        numElements = 1;
        clickCount = 0;
        console.log("Ya se completaron todos los municipios del estado");
    } else{
        clickCount++;
    }
}