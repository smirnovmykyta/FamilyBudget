import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import usersRouter from "./Routes/users.router.js";
import bp from 'body-parser';


dotenv.config()

const PORT = process.env.DB_PORT || 4000;
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/auth', usersRouter);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('DB connected');
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
