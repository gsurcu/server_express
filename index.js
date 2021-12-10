const express = require('express')

const app = express();

const PORT = process.env.PORT|| 8050;

app.get('/', (req, res) => {
  res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>')
})
app.get('/visitas', (req, res) => {
  res.send({mensaje: 'Hola desde express'})
})
app.get('/fyh', (req, res) => {
  res.send({mensaje: 'Hola desde express'})
})

const connectedServer = app.listen(PORT, () => {
  console.log( `Servidor http escuchado en el puerto ${connectedServer.address().port } `)
})

connectedServer.on("error", error => {
  console.log(error.message)
})