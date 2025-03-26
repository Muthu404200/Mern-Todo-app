import mongoose from "mongoose";

const dbSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false
    },
});

const User = mongoose.model("SampleLists",dbSchema);

export default User;
