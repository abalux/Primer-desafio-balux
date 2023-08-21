import express from "express";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";
import { engine } from "express-handlebars";
import { __filename, __dirname } from "./utils.js";
import viewsRoutes from "./routes/views.router.js";
import viewsRealTime from "./routes/realTimeProduct.router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { guardarProducto, eliminarProducto } from "./services/productUtils.js";

const app = express();
const httpServer = createServer(app);

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// configuro handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

// Configurar el directorio estático para archivos públicos
app.use(express.static("public"));

// Configurar las rutas para las vistas
app.use("/", viewsRoutes);
app.use("/realtimeproducts", viewsRealTime);

//creo las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Configuro el servidor
const PORT = 8081;
httpServer.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

// Configuración del lado del servidor
const io = new Server(httpServer);

// Configurar el evento de conexión de Socket.IO
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    // Manejar eventos personalizados
    socket.on("mensaje", (data) => {
        console.log("Mensaje recibido:", data);

      // Enviar una respuesta al cliente
    socket.emit("respuesta", "Mensaje recibido correctamente");
    });

    // Escuchar evento 'agregarProducto' y emitir 'nuevoProductoAgregado'
    socket.on("agregarProducto", (newProduct) => {
        console.log("Nuevo producto recibido backend:", newProduct);
        guardarProducto(newProduct);
        io.emit("nuevoProductoAgregado", newProduct);
    });

    socket.on('eliminarProducto',(productId) => {
        const id = productId;
        eliminarProducto(id);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});