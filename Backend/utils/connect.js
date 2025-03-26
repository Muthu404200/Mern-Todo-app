import mongoose from "mongoose";

const db = async ()=>{
    try {
        await mongoose.connect(process.env.dbLink,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongoose connected successfully");
    } catch (error) {
        console.log(`DB Error ${error}`);
    }
}

export default db;