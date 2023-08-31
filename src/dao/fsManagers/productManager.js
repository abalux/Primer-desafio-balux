import fs from "fs";


class Product {
    constructor (title, description, price, thumbnail, code, stock, category, status) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.category = category;
    this.status = status;
    }
}

class ProductManager {
    constructor () {
    this.products = [];
    }


    addProduct = (obj) => {
        this.getProducts(); 
        if (this.products.some(p => p.code === obj.code )) {
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
        const readProducts = JSON.parse(fs.readFileSync('./products.json'));
        console.log(readProducts);
        return readProducts;
    }

    getProductById = (id) => {
        this.getProducts();
        const productFound = this.products.find(p => p.id === Number(id));
        if (productFound){
            console.log(productFound)
            return productFound;
        }else{
            return "No se encontro un producto con ese id";
        }
    }

    updateProduct = (prod, id) => {
        this.getProducts();
        prod.id = Number(id)
        let index = this.products.findIndex( prod => prod.id == id)
        this.products.splice(index,1,prod)
        fs.writeFileSync('./products.json', JSON.stringify(this.products));
    }

    deleteProduct = (id) => {
        this.getProducts();
        const productFound = this.products.find(p => p.id === Number(id));
        this.products.shift(productFound);
        fs.writeFileSync('./products.json', JSON.stringify(this.products));
    }
}


//testeo
export const manager = new ProductManager();
