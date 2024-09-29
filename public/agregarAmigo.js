let formu = document.getElementById("formu");
let inputAmigo = document.getElementById("amigo")
let inputNumero = document.getElementById("numero")
const randomNumber = Math.floor(Math.random() * 10) + 1;
console.log(randomNumber)
formu.addEventListener("submit", (e) => {
    e.preventDefault();
    if(inputNumero.value === "" || inputAmigo.value === "" ){
     console.log("no se permiten datos vacios")
    }else{
        let datos = { 
            numero : inputNumero.value,
            amigo: inputAmigo.value
         };


         
     inputAmigo.value = ""
     inputNumero.value = ""

     
    fetch("/enviar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("amigo ingresado")
    })
    .catch(error => {
        console.error('Error:', error);
    });

    }
   

    
});