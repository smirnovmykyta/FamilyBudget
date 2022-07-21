import mongoose from "mongoose";


const familiesSchema = new mongoose.Schema({
    name: String,
    photo: Buffer,
},{ timestamps: true });

const Families = mongoose.model('families', familiesSchema);

export default Families;
