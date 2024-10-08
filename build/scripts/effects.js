const switchBtn = document.querySelector("#switch");
const searchBarEff = document.querySelector("#searchBar");
const fondo = document.querySelector(".fondo");
const luciernagas = document.querySelector("#luciernagas");
const weatherState = document.querySelector("#mainWeather");
const moon = document.querySelector("#mainMoon");
const daysSection = document.querySelector("#seccionDias");
const moonSection = document.querySelector("#moonFacts");

let contClicks = 0;

switchBtn.addEventListener("click", event =>{
    contClicks++;
    console.log("Click en switch");

    if(contClicks % 2 == 0){ //Noche
        fondo.classList.toggle("bg_dia");
        fondo.classList.toggle("bg_noche");
        weatherState.classList.toggle("invisible");
        weatherState.classList.toggle("weather-grid");

        searchBarEff.classList.toggle("invisible");

        daysSection.classList.toggle("invisible");

        moonSection.classList.toggle("invisible");

        moon.classList.toggle("invisible");
        moon.classList.toggle("moon-grid");
        
        switchBtn.classList.toggle("switch__mainContainer");

        luciernagas.innerHTML = `
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        <div class="firefly"></div>
        `;
        luciernagas.classList.toggle("firefly");
        if(fondo.classList.contains("bg_dia")){
            luciernagas.innerHTML = ``;
        }
    }
});

