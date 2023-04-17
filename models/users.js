import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    family: {type: String},
    password: {type: String},
    email: {
        type: String,
        required: true,
        match: /\S+@\S+\.\S+/
    },
    photo: Buffer,
});

const Users = mongoose.model('User', userSchema);

export default Users;
