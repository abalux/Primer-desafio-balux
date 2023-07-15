import express from "express";
import { manager } from './productManager.js';

const app = express();
app.use(express.static("public"));


//Configuro el servidor
const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log('Servidor ejecutándose en el puerto: ', PORT);
})
server.on('error', error => console.log('Error en el servidor: ', PORT));

//Configuro las rutas
app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    res.send(products.slice(0, limit || products.length));
})



app.get('/products/:pid', async(req,res) => {
    const pid = req.params['pid'];
    console.log(pid);
    const idFound = await manager.getProductById(pid)
    res.send(idFound);
    if (!idFound){
        res.send("No existe tal producto");
    }
})