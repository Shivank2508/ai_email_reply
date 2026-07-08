import app from "./app";
import { connectToMongoDB } from "./db/connection";
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";

console.log("1. Server file loaded");

app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

const PORT = Number(process.env.PORT) || 8000;

console.log("2. PORT =", PORT);
console.log("3. MONGODB_URL exists =", !!process.env.MONGODB_URL);

connectToMongoDB()
  .then(() => {
    console.log("4. Mongo connected");

    app.listen(PORT, () => {
      console.log(`5. Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB failed:", err);
    process.exit(1);
  });
