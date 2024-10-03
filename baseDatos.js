

const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/imagenes', express.static(__dirname + '/imagenes'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "traerAmigo.html"));
});

// Configuración de la conexión
const pool = new Pool({
  connectionString: "postgresql://richard:OtGAaV7WVl7Jxe9DajQsNAOitpckP9R9@dpg-crt31eogph6c7393kl90-a.oregon-postgres.render.com/amigosecreto_vpwy",
  ssl: {
    rejectUnauthorized: false,
  },
});

// Verificar conexión
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a PostgreSQL:', err);
    return;
  }
  console.log('Conexión exitosa a PostgreSQL');

  // Crear la tabla 'friends' si no existe
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS friends (
      numero INT,
      amigo VARCHAR(100)
    );
  `;

  pool.query(createTableQuery, (err, res) => {
    if (err) {
      console.error('Error creando la tabla:', err);
    } else {
      console.log('Tabla creada exitosamente');
    }
  });
});

module.exports = pool;

// Endpoint para enviar datos
app.post("/enviar", (req, res) => {
  const { amigo, numero } = req.body;

  if (!amigo || !numero) {
    console.log("Error: no se pudo enviar los datos");
    return res.status(400).send({ respuesta: false, message: "Datos incompletos" });
  }

  const query = "INSERT INTO friends(numero, amigo) VALUES ($1, $2)";
  
  pool.query(query, [numero, amigo], (error) => {
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
  const consulta = "SELECT * FROM friends WHERE numero = $1";

  pool.query(consulta, [numero], (error, results) => {
    if (error) {
      console.error("Error al obtener los datos: ", error.stack);
      return res.status(500).send({ success: false, message: "Error al obtener los datos" });
    }
    res.send({ success: true, data: results.rows });
  });
});

// Endpoint para ver todos los amigos
app.get("/veramigos", (req, res) => {
  const consulta = "SELECT * FROM friends";

  pool.query(consulta, (error, results) => {
    if (error) {
      console.error("Error al obtener los datos: ", error.stack);
      return res.status(500).send({ success: false, message: "Error al obtener los datos" });
    }
    res.send({ success: true, data: results.rows });
  });
});

// Endpoint para obtener los números disponibles
app.get('/numerosDisponibles', (req, res) => {
  const query = 'SELECT numero FROM friends'; // Cambiado 'amigos' a 'friends'
  
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo los números disponibles:', error);
      return res.status(500).send({ error: 'Error obteniendo los números disponibles' });
    }
    const numerosDisponibles = results.rows.map(row => row.numero); // Corregido acceso a 'results.rows'
    res.json({ numerosDisponibles });
  });
});

// Endpoint para eliminar datos
app.post('/delete', (req, res) => {
  const { numero } = req.body;

  if (!numero) {
    return res.status(400).json({ success: false, message: "Número no proporcionado" });
  }

  const query = 'DELETE FROM friends WHERE numero = $1';

  pool.query(query, [numero], (error) => {
    if (error) {
      console.error("Error al eliminar el registro:", error.stack);
      return res.status(500).json({ success: false, message: 'Error al eliminar el registro' });
    }

    console.log(`Registro con número "${numero}" eliminado exitosamente`);
    return res.json({ success: true });
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3340;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Cerrar la conexión a la base de datos al finalizar el proceso
process.on('SIGINT', () => {
  pool.end(err => {
    if (err) {
      console.error('Error cerrando la conexión a la base de datos', err);
    } else {
      console.log('Conexión a la base de datos cerrada');
    }
    process.exit();
  });
});
