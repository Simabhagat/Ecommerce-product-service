import Product from '../model/productModel.js';

export const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(200).send("Product has been added successfully");
    } catch(error) {
        console.log("Error adding product: ", error.message)
        return res.status(500).send("Server error adding product");
    }
}


//read methods
export const getProductByName =  async (req,res) => {
    try{
        const {name: productName} = req.body;
        const productsList = await Product.find({
            name: { $regex: productName, $options: 'i' } // Case-insensitive search
        })
        if(productsList.length === 0){
            return res.status(404).send("Product not found");
        }
        return res.status(200).send(productsList);
    } catch(error){
        console.log("Error getting product by name: ", error.message)
        return res.status(500).send("Server error getting product");
    }
}

export const getProductByCategory = async (req, res) => {
    try{
        const {name: categoryName} = req.body;
        const productsList = await Product.find({
            category: { $regex: categoryName, $options: 'i'}
        })
        if(productsList.length === 0){
            return res.status(404).send("Products not found");
        }
        return res.status(200).send(productsList);
    } catch(error){
        console.log("Error getting products by category: ", error.message);
        return res.status(500).send("server error getting product")
    }
}

export const getAllProducts = async (req, res) => {
    const { page = 1, pageSize = 10, category, priceMin, priceMax } = req.query; //used for query params

    const filters = {};
    category? filters.category = category : null;
    priceMin && priceMax? filters.price = { $gte: Number(priceMin), $lte: Number(priceMax) } : null;

    const skip = (page - 1) * pageSize;

    try{
        const products = await Product.find(filters).skip(skip).limit(pageSize).exec();
        if(products.length === 0){
            return res.status(404).send("Products not found");
        }

        const totalProducts = await Product.countDocuments(filters);
    
        return res.status(200).send({
            products, 
            totalProducts: totalProducts, 
            totalPages: Math.ceil(totalProducts / pageSize), 
            current_page: parseInt(page)});
     } catch(error){
        console.log("Error fetching all products: ", error.message);
        return res.status(500).send("Server error fetching all products")
     }
}

//update methods
export const updateProduct = async (req, res ) => {
    const { id } = req.params;      //used for path params
    const updates = req.body;   //the fields to be updated are passed in the request body

    try{
        //update the document with the fields provided
        const result = await Product.updateOne({ _id: id}, { $set: updates});

        if(result.modifiedCount === 0 ){
            return res.status(404).send("Product not found or no changes made");
        }

        return res.status(200).send("Product updated successfully");
    } catch(error){
        console.log("Error updating document: ", error.message);
        return res.status(500).send("Server error updating document");
    }
};

//delete method
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try{
        const result = await Product.deleteOne({ _id: id});
        if(result.deletedCount === 0){
            return res.status(404).send("product not found");
        }

        return res.status(200).send("product deleted successfully");
    } catch(error){
        console.log("Error deleting product: ", error.message);
        return res.status(500).send("Server error deleting product");
    }
}