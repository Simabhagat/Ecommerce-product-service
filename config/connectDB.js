import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect(process.env.DATABASE_URI);

    mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB');
    })

    mongoose.connection.on('error', (error) => {
    console.log('Error connecting to MongoDB: ', error.message);
    })

}

export default connectDB;