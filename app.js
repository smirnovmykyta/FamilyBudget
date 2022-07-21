import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.DB_PORT || 4000
const app = express()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(()=>{
        console.log('DB connected');
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

