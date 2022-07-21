import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    login: String,
    firstName: String,
    lastName: String,
    family: String,
    password: String,
    email: String,
    photo: Buffer,
});

const Users = mongoose.model('User', userSchema);

export default Users;