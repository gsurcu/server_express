const express = require('express')

const app = express();

const PORT = process.env.PORT|| 8080;
const fs = require('fs');

class Contenedor {
  constructor(nombre){
    this.nombre = `./${nombre}.txt`;
    this.items = [];
  }
  async open(){
    try {
      if (fs.existsSync(this.nombre)) {
        this.items = JSON.parse(fs.readFileSync(this.nombre,'utf-8'));
      } else {
        fs.writeFileSync(this.nombre,JSON.stringify([]),'utf-8');
      }
    } catch (error) {}
  }
  async save(producto){
    try {
      this.items.push({id:this.length, title:producto.title, price:producto.price, id: (this.items.length + 1),thumbnail: producto.img});
      await fs.promises.writeFile(this.nombre,JSON.stringify(this.items,null, 2));
      return this.items.length;
      }
      catch(error) {
        console.log(error.message);
      }
  }
  async getById(id){
    try {
      const info = await this.getAll()
      const obj = (info != undefined) ? info.find(o => o.id == id) : [];
      console.log(obj);
      return obj;
    } catch (error) {
      console.log(error)
    }
  }

  async getAll(){
    try {
      if (fs.existsSync(this.nombre)) {
        const datos = await fs.promises.readFile(this.nombre, 'utf-8')
        return JSON.parse(datos);
      }
      
      return undefined
    } catch (error) {
      console.log('error');
    }
  }

  async deleteById(id){
    try {
      const info = await this.getAll()
      const obj = (info != undefined) ? info.filter(o => o.id !== id) : info;
      console.log(obj);
      return await fs.promises.writeFile(this.nombre,JSON.stringify(obj,null, 2));
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAll(){
    await fs.promises.unlink(this.nombre)
  }
}
const load = async () => {
  const id = await productos.save({title:'regla',price: 7, img: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Regla_H.svg'});
  console.log(id);
}

const productos = new Contenedor("productos");
productos.open()
// load();
// productos.getById(3);
// productos.getAll();
// productos.deleteById(2);
// productos.deleteAll();

app.get('/', (req, res) => {
  res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>')
})
app.get('/productos', (req, res) => {
  res.send(productos.items)
})
app.get('/productoRandom', (req, res) => {
  const idRandom = Math.floor((productos.items.length + 1)*(Math.random()))
  res.send(productos.items[idRandom])
})

const connectedServer = app.listen(PORT, () => {
  console.log( `Servidor http escuchado en el puerto ${connectedServer.address().port } `)
})

connectedServer.on("error", error => {
  console.log(error.message)
})
