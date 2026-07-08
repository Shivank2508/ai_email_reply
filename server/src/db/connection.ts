
import mongoose from "mongoose";

export async function connectToMongoDB() {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URL}`,
        );

        console.log("You successfully connected to MongoDB!");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
