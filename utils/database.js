import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Already connected to db");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGOOSE_URI, {
            dbName: 'share_blog',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log("Mongodb connected")


    } catch (error) {
        console.log(error)
    }
}