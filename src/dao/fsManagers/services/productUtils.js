import fs from "fs";
import path from "path";
import { __dirname } from "../../../utils.js";

export function obtenerListaDeProductos() {
    const filePath = path.join(__dirname, "../productos.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);

    return data;
}

export function guardarProducto({
    title,
    price,
    description,
    code,
    stock,
    id
}) {
    const filePath = path.join(__dirname, "../productos.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);

    data.push({
        title: title,
        price: price,
        description: description,
        code: code,
        stock: stock,
        id: id
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function eliminarProducto(id) {
    console.log('Eliminar producto con ID:', id);

    const filePath = path.join(__dirname, '../productos.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    const productoIndex = data.findIndex(product => product.id === id);

    if (productoIndex !== -1) {
        data.splice(productoIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log('Producto eliminado correctamente.');
    } else {
        console.log('Producto no encontrado en el array.');
    }
}