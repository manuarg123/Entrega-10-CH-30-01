import "../config.js";
import { CartModel } from '../models/cart.js';

/**
 * Clase para hacer el manejo del carrito
 */
export class CartDao {
    ID_FIELD = "_id";

    async createCart(){
        try {
          return await CartModel.create({});  
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteCartById(id) {
        try {
            return await CartModel.findByIdAndDelete({[this.ID_FIELD]: id})
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async saveProductToCart(id, obj) {
        try {
            const cart = await CartModel.findById(id)
            cart.products.push(obj.productId);
            cart.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteProductFromCart(id, productId) {
        try {
            const cart = await CartModel.findById(id);
            cart.products.remove(productId);
            cart.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAllProductsFromCart(id) {
        try {
            return await CartModel.findById(id).populate('products').select({products: 1, _id:0});
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}