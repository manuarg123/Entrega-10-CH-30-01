import "../config.js";
import { ProductModel } from "../models/productModel.js";

export class ProductDao {
    ID_FIELD = "_id";
    
    static async exists(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return await ProductModel.find();
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async getProductById(objectId) {
        try {
            const product = await ProductModel.findOne({
                [this.ID_FIELD] : objectId
            })
            console.log(product);
            return product;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async createProduct(object) {
        try {
            return await ProductModel.create(object)
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async updateProductById(id, object) {
        try {
            await ProductModel.findByIdAndUpdate(
                {
                    [this.ID_FIELD] : id
                },
                object, 
                {
                    runValidators: true
                })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async deleteProductById(id) {
        try {
            return await ProductModel.findByIdAndDelete({[this.ID_FIELD]: id})
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}