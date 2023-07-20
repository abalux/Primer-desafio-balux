import express from "express";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//creo las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Configuro el servidor
const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log('Servidor ejecutándose en el puerto: ', PORT);
})
server.on('error', error => console.log('Error en el servidor: ', PORT));