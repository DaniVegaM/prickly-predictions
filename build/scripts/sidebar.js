//SideBar

const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const blur = document.querySelector("#blur");

toggle.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
    blur.classList.toggle("blur");
    console.log("Clic en sidebar");
});

blur.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
    blur.classList.toggle("blur");
    console.log("Clic en contenido, toca cerrar sidebar");
});