import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId:{
        type:String, required:true
    },
    title:{
        type:String, required:true
    },
    content:{
        type:String, required:true,
        max:2000
    },
    source:{
        type:String, required:true
    },
    image:{
        type:String,
        default:"https://r2.erweima.ai/imgcompressed/compressed_5c1c67db70325a0eb289c68465108887.webp"

    },
    category:{
        type:String,
        default:"Inofrmation"
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true});



const Post =  mongoose.model("Post", postSchema);
export default Post