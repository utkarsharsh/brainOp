import mongoose  from 'mongoose'

const users = new mongoose.Schema({
    email: String,
    name:String,
    password:String,
    image:String,
},{
    timestamps:true
});
export default mongoose.model("users",users);