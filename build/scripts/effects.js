const switchBtn = document.querySelector("#switch");
const fondo = document.querySelector(".fondo");
const luciernagas = document.querySelector("#luciernagas");
const weatherState = document.querySelector("#mainWeather");
const moon = document.querySelector("#mainMoon");

switchBtn.addEventListener("click", () =>{
    console.log("Click en switch");

    if(fondo.classList.contains("bg_dia")){ //Noche
        fondo.classList.remove("bg_dia");
        fondo.classList.add("bg_noche");
        weatherState.classList.add("invisible");
        weatherState.classList.remove("weather-grid");

        moon.classList.remove("invisible");
        moon.classList.add("moon-grid");

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
        luciernagas.classList.add("firefly");
    } else{ //Dia
        fondo.classList.remove("bg_noche");
        fondo.classList.add("bg_dia");
        weatherState.classList.remove("invisible");
        weatherState.classList.add("weather-grid");

        moon.classList.add("invisible");
        moon.classList.remove("moon-grid");

        luciernagas.classList.remove("firefly");
        luciernagas.innerHTML = "";
    }
});