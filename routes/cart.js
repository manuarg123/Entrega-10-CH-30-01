import express from "express";
import { CartDao } from "../dao/CartDao.js";
import { ProductDao } from "../dao/ProductoDao.js";

const router = express.Router();
const cartDao = new CartDao();

/**
 *  POST
 *  @route /api/cart
 */
router.post('/', async (_req, res) => {
    const newCart = await cartDao.createCart();
    
    newCart
        ? res.status(200).json({"success": "Producto añadido con el ID " + newCart._id})
        : res.status(500).json({"error": "Ha ocurrido un error"})
    
})

/**
 *  Delete
 *  @route /api/cart/:id
 */
router.delete('/:id', async(req,res) => {
    const { id } = req.params;
    const wasDeleted = await cartDao.deleteCartById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "Carrito eliminado exitosamente"})
        : res.status(404).json({"error": "carrito no encontrado"})
     
})

/**
 *  POST
 *  @route /api/carrito/:id/productos
 */
router.post('/:id/productos', async(req,res) => {
    const { id } = req.params;
    const { body } = req;
    
    const productExists = await ProductDao.exists(body.productId);
    
    if(productExists) {
        await cartDao.saveProductToCart(id, body)
    } else {
        res.status(404).json({"error": "producto no encontrado"});
    }
    
})

/**
 *  GET
 *  @route /api/carrito/:id/productos
 */
router.get('/:id/productos', async(req,res)=>{
    const { id } = req.params;
    const cartProducts = await cartDao.getAllProductsFromCart(id);
    
    cartProducts
        ? res.status(200).json(cartProducts)
        : res.status(404).json({"error": "carrito no encontrado"})
})

/**
 * DELETE 
 * @route /api/carrito/:id/productos/:id_prod
 */
router.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    
    const wasDeleted = await carritoDao.deleteProductFromCart(id, id_prod);
    
    wasDeleted 
        ? res.status(200).json({"success": "este producto ha sido eliminado"})
        : res.status(400).json({"error": "ocrurrió un error"})
    
})

export default router;