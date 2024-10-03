let contentAmigo = document.getElementById("contentAmigo");
let FotoAmigo = document.getElementById("FotoAmigo");

// Mapa de amigos a imágenes
const amigosImagenes = {
  "Jesus": "jesus.jpg",
  "Yeris": "yeris.jpg",
  "Juan Pablo": "juanPablo.jpg",
  "Valentina": "valentina.jpg",
  "Vanesa": "vanesa.jpg",
  "Magola": "magola.jpg",
  "Francy": "francy.jpg",
  "Richard Hijo": "richardh.jpg",
  "Heidi": "heidi.jpg",
  "Richard": "richard.jpg"
};

// Función para obtener los números disponibles desde el servidor
function obtenerNumerosDisponibles() {
  return fetch('/numerosDisponibles')
    .then(response => response.json())
    .then(data => data.numerosDisponibles)
    .catch(error => {
      console.error("Error al obtener los números disponibles:", error);
      mostrarMensaje("Error al obtener los números disponibles. Intenta de nuevo más tarde.");
      return [];
    });
}

// Función para mostrar mensajes en el DOM
function mostrarMensaje(mensaje) {
  let div = document.createElement("div");
  div.textContent = mensaje;
  contentAmigo.appendChild(div);
}

// Función principal para obtener un amigo
function obtenerAmigo() {
  obtenerNumerosDisponibles().then(numerosDisponibles => {
    if (numerosDisponibles.length === 0) {
      mostrarMensaje("No hay amigos disponibles. Intenta de nuevo más tarde.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * numerosDisponibles.length);
    const randomNumber = numerosDisponibles[randomIndex];

    fetch(`/traer?numero=${randomNumber}`)
      .then(response => response.json())
      .then(data => {
        if (data.data.length > 0) {
          data.data.forEach(element => {
            let div = document.createElement("div");
            div.textContent = element.amigo;
            contentAmigo.appendChild(div);

            // Actualizar la imagen en función del amigo encontrado
            const imagen = amigosImagenes[element.amigo];
            if (imagen) {
              actualizarImagen(imagen);
            } else {
              FotoAmigo.textContent = "No se encontró ningún amigo";
            }
          });
        } else {
          mostrarMensaje("Intenta de nuevo, presiona ver amigo secreto");
          setTimeout(() => {
            window.location.href = 'traerAmigo.html';
          }, 2000);
        }
      })
      .catch(error => {
        console.error("Error al obtener el amigo:", error);
        mostrarMensaje("Error al obtener el amigo. Intenta de nuevo más tarde.");
      });

    // Eliminar el número después de 1000 ms (1 segundo)
    setTimeout(() => {
      fetch("/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero: randomNumber }),
      })
        .then(response => response.json())
        .then(() => console.log(`Se eliminó el amigo con número ${randomNumber}`))
        .catch(error => console.error("Error al eliminar el amigo:", error));
    }, 1000);
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
