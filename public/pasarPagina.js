let contentAmigo = document.getElementById("contentAmigo");
let FotoAmigo = document.getElementById("FotoAmigo");

// Función para obtener los números disponibles desde el servidor
function obtenerNumerosDisponibles() {
  return fetch('/numerosDisponibles')
    .then((response) => response.json())
    .then((data) => {
      return data.numerosDisponibles;
    })
    .catch((error) => {
      console.error("Error al obtener los números disponibles:", error);
      return [];
    });
}

// Función principal para obtener un amigo
function obtenerAmigo() {
  obtenerNumerosDisponibles().then((numerosDisponibles) => {
    if (numerosDisponibles.length === 0) {
      console.log("No hay números disponibles");
      let div = document.createElement("div");
      div.textContent = "No hay amigos disponibles. Intenta de nuevo más tarde.";
      contentAmigo.appendChild(div);
      return;
    }

    // Seleccionar un número disponible aleatoriamente
    const randomIndex = Math.floor(Math.random() * numerosDisponibles.length);
    const randomNumber = numerosDisponibles[randomIndex];

    // Llamar al servidor para traer el amigo correspondiente
    fetch(`/traer?numero=${randomNumber}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        if (data.data.length > 0) {
          data.data.forEach((element) => {
            let div = document.createElement("div");
            div.textContent = element.amigo;
            contentAmigo.appendChild(div);
            console.log(div.textContent);

            // Actualizar la imagen en función del amigo encontrado
            switch (div.textContent) {
              case "Jesus":
                actualizarImagen("jesus.jpg");
                break;
              case "Yeris":
                actualizarImagen("yeris.jpg");
                break;
              case "Juan Pablo":
                actualizarImagen("juanPablo.jpg");
                break;
              case "Valentina":
                actualizarImagen("valentina.jpg");
                break;
              case "Vanesa":
                actualizarImagen("vanesa.jpg");
                break;
              case "Magola":
                actualizarImagen("magola.jpg");
                break;
              case "Francy":
                actualizarImagen("francy.jpg");
                break;
              case "Richard Hijo":
                actualizarImagen("richardh.jpg");
                break;
              case "Heidi":
                actualizarImagen("heidi.jpg");
                break;
              case "Richard":
                actualizarImagen("richard.jpg");
                break;
              default:
                FotoAmigo.textContent = "No se encontró ningún amigo";
                break;
            }
          });
        } else {
          let div = document.createElement("div");
          div.textContent = "Intenta de nuevo, presiona ver amigo secreto";
          contentAmigo.appendChild(div);
          setTimeout(() => {
            window.location.href = 'traerAmigo.html';
          }, 2000);
        }
      });

    // Eliminar el número después de 500 ms
    setTimeout(() => {
      fetch("/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero: randomNumber }),
      })
        .then((response) => response.json())
        .then(() => console.log(`Se eliminó el amigo con número ${randomNumber}`))
        .catch((error) => console.error("Error al eliminar el amigo:", error));
    }, 500);
  });
}

// Función para actualizar la imagen del amigo
function actualizarImagen(imagen) {
  FotoAmigo.style.backgroundImage = `url(../imagenes/${imagen})`;
  FotoAmigo.style.backgroundSize = "cover";
  FotoAmigo.style.backgroundPosition = "center";
  FotoAmigo.style.backgroundRepeat = "no-repeat";
}

// Llamada para obtener el amigo al cargar la página
obtenerAmigo();

