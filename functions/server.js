const express = require('express');
const fs = require('fs');
const path = require('path');

//NETLIFY (permite correr mi código sin un servido (sin el app.listen!))
const serverless = require('serverless-http');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/upload-cv', (req, res) => {

    const archivo = req.body.archivo;
    if (!archivo) {
        return res.status(400).json({ error: 'No se ha seleccionado un archivo' });
    }
    const nombreArchivo = `${Date.now()}_cv.pdf`;
    const ruta = path.join(__dirname,'..', 'uploads', nombreArchivo);

    fs.writeFileSync(ruta, archivo, 'base64', (error) => {
        if (error) {
            return res.status(500).json({ error: 'Error al subir el archivo' });
        }
        res.json({ mensaje: 'Archivo subido correctamente' });
    });
})
// const PORT =3000;
// app.listen(PORT,()=>{
//     console.log(`Servidor escuchando en el puerto ${PORT}`);
// })

//NETLIFY
console.log("Código sin servidor");
module.exports.handler = serverless(app);