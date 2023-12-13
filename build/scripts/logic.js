const inicio = document.querySelector("#option__inicio");
const buscar = document.querySelector("#option__buscar");
const listado = document.querySelector("#option__listado");
const acerca = document.querySelector("#option__acerca");

inicio.addEventListener("click", ()=>{
    window.location.href = 'index.html';
});
buscar.addEventListener("click", ()=>{
    window.location.href = 'buscar.html';
});
listado.addEventListener("click", ()=>{
    window.location.href = 'listado.html';
});
acerca.addEventListener("click", ()=>{
    window.location.href = 'acerca.html';
});