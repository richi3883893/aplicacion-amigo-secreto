const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config(); // Para usar variables de entorno

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/imagenes', express.static(__dirname + '/imagenes'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "traerAmigo.html"));
});

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Conectar a la base de datos
client.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa');

  // Crear la tabla "amigos" si no existe
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS amigos (
      numero SERIAL PRIMARY KEY,
      amigos VARCHAR(255) NOT NULL
    );
  `;

  client.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error al crear la tabla:', err.stack);
    } else {
      console.log('Tabla "amigos" creada o ya existe');
    }
  });
});

// Endpoint para enviar datos
app.post("/enviar", (req, res) => {
  const { amigo, numero } = req.body;

  if (!amigo || !numero) {
    console.log("Error: no se pudo enviar los datos");
    return res.status(400).send({ respuesta: false, message: "Datos incompletos" });
  }

  const query = "INSERT INTO amigos (numero, amigos) VALUES ($1, $2)";
  client.query(query, [numero, amigo], (error) => {
    if (error) {
      console.log("Error: no se pudo enviar los datos", error.stack);
      return res.status(500).send({ respuesta: false, message: "Error al insertar datos" });
    }

    res.send({ respuesta: true, message: "Datos enviados correctamente" });
  });
});

// Endpoint para traer datos
app.get("/traer", (req, res) => {
  const numero = req.query.numero;
  const consulta = "SELECT * FROM amigos WHERE numero = $1";

  client.query(consulta, [numero], (error, results) => {
    if (error) {
      console.error("Error al obtener los datos: ", error.stack);
      return res.status(500).send({ success: false, message: "Error al obtener los datos" });
    }
    res.send({ success: true, data: results.rows });
  });
});

// Endpoint para eliminar datos
app.post('/delete', (req, res) => {
  const { numero } = req.body;

  if (!numero) {
    return res.status(400).json({ success: false, message: "Número no proporcionado" });
  }

  const query = 'DELETE FROM amigos WHERE numero = $1';

  client.query(query, [numero], (error) => {
    if (error) {
      console.error("Error al eliminar el registro:", error.stack);
      return res.status(500).json({ success: false, message: 'Error al eliminar el registro' });
    }

    console.log(`Registro con número "${numero}" eliminado exitosamente`);
    return res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3340;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Cerrar conexión a la base de datos al finalizar
process.on('SIGINT', () => {
  client.end(err => {
    if (err) {
      console.error('Error cerrando la conexión a la base de datos', err);
    } else {
      console.log('Conexión a la base de datos cerrada');
    }
    process.exit();
  });
});
