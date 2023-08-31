import express from "express";
import * as dotenv from "dotenv";
import __dirname from "./utils.js";

import { engine } from "express-handlebars";
import exphbs from "express-handlebars";

import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";
import viewsRouter from "./routes/views.router.js";
import viewsRealTime from "./routes/realTimeProduct.router.js";
import messagesRouter from "./routes/messages.routes.js";

import { Server } from "socket.io";

import { addProduct, deleteProduct } from "./dao/dbManagers/productManager.js";
import { addMessages, getMessages } from "./dao/dbManagers/messageManager.js";

import mongoose from "mongoose";

dotenv.config();

const app = express();

const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb+srv://baluxagustina:Theshowmustgoon97666.@cluster0.zhfn8hs.mongodb.net/";

let dbConnect = mongoose.connect(MONGO_URI);
dbConnect.then(() => {
    console.log("conexion a la base de datos exitosa");
}),
    (error) => {
        console.log("Error en la conexion a la base de datos", error);
    };

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const hbs = exphbs.create();

// Registro del helper "prop" en el motor de plantillas para poder renderizar las propiedades de los objetos.
hbs.handlebars.registerHelper("prop", function (obj, key) {
    return obj[key];
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(express.static("public"));

app.use("/realtimeproducts", viewsRealTime);
app.use("/", viewsRouter);
app.use("/messages", messagesRouter);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


//Configuro el servidor
const PORT = 8081;
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
    });

// Configuración del lado del servidor
const io = new Server(httpServer);

// Configurar el evento de conexión de Socket.IO
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("mensaje", (data) => {
        console.log("Mensaje recibido:", data);

        socket.emit("render", "Me estoy comunicando desde el servidor");
    
        socket.emit("respuesta", "Mensaje recibido correctamente");
    });

    socket.on("addProduct", (product) => {
        addProduct(product);
    });

    socket.on("delete-product", (productId) => {
        const { id } = productId;
        deleteProduct(id);
    });

    socket.on("user-message", (obj) => {
        addMessages(obj);
        io.emit("new-message", obj)
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});