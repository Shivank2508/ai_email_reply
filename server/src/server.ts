import app from "./app";
import { connectToMongoDB } from "./db/connection";
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";

app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

const PORT = Number(process.env.PORT) || 8000;

connectToMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });
