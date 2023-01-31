import express from 'express';
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';

//importo la clase para conectarme la base de datos
import {Conections} from "./config.js";

const app = express();
const PORT = 8080;
const conections = new Conections;

//hago la conexión a los servidores y express
const startConection = async () => {
    try {
        conections.conectMongoDB();
        conections.connectToFirebase();

        const server = app.listen(PORT, () => {
            console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startConection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Configuración de rutas
app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);