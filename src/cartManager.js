import fs from 'fs';
import { manager } from './productManager.js';



class CartManager{
    constructor() {
        this.carts = [];
        this.path = "./carrito.json";
    }


    getCartById = (cid) => {
        fs.readFileSync(this.path, 'utf-8');
        const productFound = this.carts.find(p => p.id === Number(cid));
        return productFound;
    }

    createCarts = (cart) => {
        fs.readFileSync(this.path, 'utf-8');
        const length = this.carts.length;
        cart.id = length + 1;
        cart.products = [];
        this.carts.push(cart);
        fs.writeFileSync(this.path , JSON.stringify(this.carts));
        return this.carts;
    }

    addProductCart = async(cid, pid) => {
        fs.readFileSync(this.path, 'utf-8');
        const cart = await this.getCartById(cid);
        await manager.getProductById(pid);
        const index = cart.products.findIndex(p => p.product == pid);
        
        if (index != -1) {
            cart.products[index].quantity += 1;
        } else {
            cart.products.push({product: pid, quantity: 1});
        }

        fs.writeFileSync(this.path , JSON.stringify(this.carts));
    }
}

export const cartManager = new CartManager();