import express from "express";
import { cartManager } from "../cartManager.js";

const cartsRouter = express.Router();

cartsRouter.post('/guardar', async(req, res)=>{
    const cart = req.body;
    await cartManager.createCarts(cart);
    res.send(cart);
})

cartsRouter.get('/:cid', async(req, res)=>{
    const cid = parseInt(req.params['cid']);
    const idFound = await cartManager.getCartById(cid)
    res.send(idFound);
})

cartsRouter.post('/:cid/product/:pid', async(req, res)=>{
    const cid = parseInt(req.params['cid']);
    const pid = parseInt(req.params['pid']);
    const product = await cartManager.addProductCart(cid, pid);
    res.send(product);  
})

export default cartsRouter;