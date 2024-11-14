import express from 'express';
import dotenv from 'dotenv';
import { addProduct, getAllProducts, getProductByCategory, getProductByName ,updateProduct, deleteProduct } from './controller/productController.js';
import connectDB from './config/connectDB.js';

dotenv.config({ path: 'config/.env'});


console.log(process.env.DATABASE_URI)
connectDB();

const app = express();


//parse json
app.use(express.json());

app.get('/', (req, res) => {
    return res.send("product service is running");

})

//crud routes for product
// --- get ----
app.get('/api/products/getByName', getProductByName);
app.get('/api/products/getByCategory', getProductByCategory);
app.get('/api/products/getAll', getAllProducts);

// --- post ----
app.post('/api/products/add', addProduct);
app.post('/api/products/update/:id', updateProduct);
app.post('/api/products/delete/:id', deleteProduct);


app.listen(process.env.PORT, (req,res) => {
    console.log("product service is running: ", process.env.PORT);
})

