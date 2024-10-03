let traerAmigosBoton = document.getElementById("traerAmigos")
let contentverAmigo = document.getElementById("verAmigo");
let contentAmigo = document.getElementById("contentAmigo");

fetch("/veramigos")
.then(response => response.json())
.then(data => data.data.forEach(element => {
    console.log(element.numero , element.amigo)
    console.log("numero de amigos disponibles" , data.data.length)
}))
    
   


traerAmigosBoton.addEventListener("click", () => {
    window.location.href = 'carga.html';
})


