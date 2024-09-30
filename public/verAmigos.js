let traerAmigosBoton = document.getElementById("traerAmigos");
let contentverAmigo = document.getElementById("verAmigo");
let contentAmigo = document.getElementById("contentAmigo");

fetch("/veramigos")
.then(response => response.json())
.then(data => console.log(data.data.length))

traerAmigosBoton.addEventListener("click", () => {
    window.location.href = 'carga.html';
})


