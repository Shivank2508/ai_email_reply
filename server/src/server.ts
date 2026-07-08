import app from "./app";
import { connectToMongoDB } from "./db/connection";
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";

app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

const port = 8000;

connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});