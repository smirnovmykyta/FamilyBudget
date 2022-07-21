import mongoose from "mongoose";


const familiesSchema = new mongoose.Schema({
    name: String,
    photo: Buffer,
});

const Families = mongoose.model('families', familiesSchema);

export default Families;
