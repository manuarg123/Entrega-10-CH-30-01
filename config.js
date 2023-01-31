import mongoose from 'mongoose';
import admin from 'firebase-admin';
import fs from "fs";
import dotenv from "dotenv";

export class Conections{
    async connectToFirebase () {
        const serviceAccount = JSON.parse(fs.readFileSync("./firebase/entrega10coder-firebase-adminsdk-wk7vg-20a01c1d72.json", "utf-8"))  
        
        try {
             admin.initializeApp({
                 credential : admin.credential.cert(serviceAccount),
                 databaseURL : "https://entrega10coder.firebaseio.com"
             })    
             console.log("Base de datos Firebase conectada!")
        } catch (error) {
             console.log(`Ocurrió un error: ${error}`)
        }
     }
     
     async conectMongoDB () {
         const URL = "mongodb+srv://root:root@cluster0.csqs3np.mongodb.net/ecommerce?retryWrites=true&w=majority";
         dotenv.config();

         return mongoose.connect(URL, {}, error => {
             if(error) throw new Error( `Error en la conexión a la base de datos: ${error}`);
             console.log("Base de datos MongoDB conectada !")
         });
     }
}
