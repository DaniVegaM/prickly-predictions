const inicio = document.querySelector("#option__inicio");
const buscar = document.querySelector("#option__buscar");
const aprende = document.querySelector("#option__aprende");
const acerca = document.querySelector("#option__acerca");

inicio.addEventListener("click", ()=>{
    window.location.href = 'index.html';
});
buscar.addEventListener("click", ()=>{
    window.location.href = 'buscar.html';
});
aprende.addEventListener("click", ()=>{
    window.location.href = 'aprende.html';
});
acerca.addEventListener("click", ()=>{
    window.location.href = 'acerca.html';
});