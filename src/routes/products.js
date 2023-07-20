import express from "express";
import { manager } from "../productManager.js";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    res.send(products.slice(0, limit || products.length));
})

productsRouter.get('/:pid', async(req,res) => {
    const pid = req.params['pid'];
    console.log(pid);
    const idFound = await manager.getProductById(pid)
    res.send(idFound);
    if (!idFound){
        res.send("No existe tal producto");
    }
})

productsRouter.post('/guardar', async (req, res) => {
        const product = req.body
        await manager.addProduct(product);
        res.send(product);

})

productsRouter.put('/actualizar/:id', async(req, res) =>{
    const {id} = req.params;
    const product = req.body;
    await manager.updateProduct(product, id);
    res.json(product);
})

productsRouter.delete('/borrar/:id', async(req, res) => {
    const {id} = req.params;
    const product = await manager.deleteProduct(id) 
    res.json(product);
})

export default productsRouter;