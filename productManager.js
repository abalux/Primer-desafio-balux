import fs from "fs";

class Product {
    constructor (title, description, price, thumbnail, code, stock) {
            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail;
            this.code = code;
            this.stock = stock;
        }
    }

    class ProductManager {
        constructor () {
            this.products = [];
        }

        addProduct = (obj) => {
            this.getProducts();
            if (this.products.some(p => p.code === obj.code)) {
            console.log("necesita otro id");
            } else if (Object.values(obj).length > 0) {
                const length = this.products.length;
                obj.id = length + 1;
                this.products.push(obj);
                fs.writeFileSync('./products.json', JSON.stringify(this.products));
            } else {
                console.log("Es obligatorio llenar todos los campos");
            }
        }

        getProducts = () => {
            JSON.parse(fs.readFileSync('./products.json'));
            console.log(this.products);
        }

        getProductById = (id) => {
            this.getProducts();
            const productFound = this.products.find(p => p.id === id);
            productFound ? console.log(productFound) : console.error("Ese id no existe");
        }

        updateProduct = (id, title, description, price, thumbnail, code, stock) => {
            this.getProducts();
            const index = this.products.findIndex(p => p.id === id );
            this.products[index] = {title, description, price, thumbnail, code, stock, id}
            fs.writeFileSync('./products.json', JSON.stringify(this.products));
        }

        deleteProduct = (id) => {
            this.getProducts();
            const productFound = this.products.find(p => p.id === id);
            this.products.shift(productFound);
            fs.writeFileSync('./products.json', JSON.stringify(this.products));
        }
    }

      //testeo
    let manager = new ProductManager();
    let productA = new Product("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    manager.getProducts();
    manager.addProduct(productA);
    manager.getProducts();
    manager.getProductById(1);
    let productB = new Product("Producto prueba b ", "Este es un producto prueba b ", 200, "Sin imagen", "abc124", 25);
    manager.addProduct(productB);
    manager.getProducts();
    manager.deleteProduct(1);
    manager.getProducts();
    manager.updateProduct(2,"Producto prueba b ", "Este es un producto prueba b ", 400, "Sin imagen", "abc124", 25);
    manager.getProducts();