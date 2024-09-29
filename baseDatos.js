const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');


const app = express();

app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/imagenes', express.static(__dirname + '/imagenes'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "traerAmigo.html"));
});


let connection = mysql.createConnection({
  host: "127.0.0.1",
  database: "amigoSecretos",
  port: "3306",
  user: "root",
  password: ""
});

connection.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err.stack);
    return;
  }
  console.log("Conectado a la base de datos con ID:", connection.threadId);
});

app.post("/enviar" , (req,res) =>{
let datos = req.body
let amigo = datos.amigo
let numero = datos.numero

if(amigo === "" || numero === "" ){
  console.log("error no se pudo enviar los datos")
}else{
  let query = "INSERT INTO amigos (numero ,amigos) VALUES(?, ?)"
  connection.query(query,[numero , amigo], (error , results) =>{
  if(error){
      console.log("error no se pudo enviar los datos")
  }
  
  res.send({respuesta : true , numero:"datos enviados correctamente"})
  })
}



})





    app.get("/traer", (req, res) => {
        let numero = req.query.numero;

         
        let consulta = "SELECT * FROM amigos WHERE numero = ?";
      
        connection.query(consulta, [numero], function (error, results) {
          if (error) {
            console.error("Error al obtener los datos: ", error);
            res.status(500).send({ success: false, message: "Error al obtener los datos" });
          } else {
            console.log(results);
            res.send({ success: true, data: results });
          }
        });
      });


      app.post('/delete', (req, res) => {
        const { numero } = req.body; 
    
        if (!numero) {
            return res.status(400).json({ success: false, message: "Número no proporcionado" });
        }
    
        const query = 'DELETE FROM amigos WHERE numero = ?';
    
        connection.query(query, [numero], (error, results) => {
            if (error) {
                console.error("Error al eliminar el registro:", error);
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
