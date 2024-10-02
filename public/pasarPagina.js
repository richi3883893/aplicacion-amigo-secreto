
let contentAmigo = document.getElementById("contentAmigo");
let FotoAmigo = document.getElementById("FotoAmigo")


const randomNumber = Math.floor(Math.random() * 10) + 1;
  console.log(randomNumber);

  fetch(`/traer?numero=${randomNumber}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data)
        if(data.data.length > 0){
            data.data.forEach((element) => { {
                let div = document.createElement("div");
                  div.textContent = element.amigo;
                  contentAmigo.appendChild(div);
                  console.log(div.textContent)

                  switch (div.textContent) {
                    case "Jesus":
                      FotoAmigo.style.backgroundImage = "url(../imagenes/jesus.jpg)"
                      FotoAmigo.style.backgroundSize = "cover";  
                     FotoAmigo.style.backgroundPosition = "center"; 
                     FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                      break;

                      case "Yeris":
                       FotoAmigo.style.backgroundImage = "url(../imagenes/yeris.jpg)"
                       FotoAmigo.style.backgroundSize = "cover";  
                       FotoAmigo.style.backgroundPosition = "center"; 
                       FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                      break;

                      case "Juan Pablo":
                       FotoAmigo.style.backgroundImage = "url(../imagenes/juanPablo.jpg)"
                       FotoAmigo.style.backgroundSize = "cover";  
                       FotoAmigo.style.backgroundPosition = "center"; 
                       FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                      break;

                      case "Valentina":
                       FotoAmigo.style.backgroundImage = "url(../imagenes/valentina.jpg)"
                       FotoAmigo.style.backgroundSize = "cover";  
                       FotoAmigo.style.backgroundPosition = "center"; 
                       FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                      break;


                      case "Vanesa":
                       FotoAmigo.style.backgroundImage = "url(../imagenes/vanesa.jpg)"
                       FotoAmigo.style.backgroundSize = "cover";  
                       FotoAmigo.style.backgroundPosition = "center"; 
                       FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                       break;
 
                       case "Magola":
                        FotoAmigo.style.backgroundImage = "url(../imagenes/magola.jpg)"
                        FotoAmigo.style.backgroundSize = "cover";  
                       FotoAmigo.style.backgroundPosition = "center"; 
                       FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                       break;
 
                       case "Francy":
                        FotoAmigo.style.backgroundImage = "url(../imagenes/francy.jpg)"
                        FotoAmigo.style.backgroundSize = "cover";  
                       FotoAmigo.style.backgroundPosition = "center"; 
                       FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                       break;
 
                       case"Richard Hijo":
                       FotoAmigo.style.backgroundImage = "url(../imagenes/richardh.jpg)"
                       FotoAmigo.style.backgroundSize = "cover";  
                      FotoAmigo.style.backgroundPosition = "center"; 
                      FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                       break;

                       case "Heidi":
                        FotoAmigo.style.backgroundImage = "url(../imagenes/heidi.jpg)"
                        FotoAmigo.style.backgroundSize = "cover";  
                       FotoAmigo.style.backgroundPosition = "center"; 
                       FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                       break;

                       case "Richard":
                        FotoAmigo.style.backgroundImage = "url(../imagenes/richard.jpg)"
                        FotoAmigo.style.backgroundSize = "cover";  
                       FotoAmigo.style.backgroundPosition = "center"; 
                       FotoAmigo.style.backgroundRepeat = "no-repeat"; 
                       break;
                  
                    default:
                      FotoAmigo.textContent = "no se encontro ningun amigo"
                      break;
                  }
                }
        
              });
        }else{
          let div = document.createElement("div");
          div.textContent = "intenta de nuevo presiona ver amigo secreto";
          contentAmigo.appendChild(div);
          setTimeout(() => {
            window.location.href = 'traerAmigo.html';
        },2000)

          
        }
      
    });

  setTimeout(() => {
    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numero: randomNumber }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Se eliminó el nombre"))
      .catch((error) => console.error("Error al eliminar el nombre:", error));
  }, 500);
