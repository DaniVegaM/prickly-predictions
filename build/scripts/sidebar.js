//SideBar

const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const blur = document.querySelector("#blur");

toggle.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
    blur.classList.toggle("blur");
    console.log("Clic en sidebar");
<<<<<<< HEAD
});

blur.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
    blur.classList.toggle("blur");
    console.log("Clic en contenido, toca cerrar sidebar");
=======
>>>>>>> e7ad9c5e9a7dcf77b49d6ae8cbe7d9bc1c87b88c
});