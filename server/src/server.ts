import app from "./app";
import { connectToMongoDB } from "./db/connection";
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";

console.log("1. Server file loaded");

app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

const PORT = Number(process.env.PORT) || 8000;

console.log("2. PORT =", PORT);
console.log("3. MONGODB_URL exists =", !!process.env.MONGODB_URL);

connectToMongoDB()
  .then(() => {
    console.log("4. Mongo connected");

    app.listen(PORT, () => {
      console.log(`5. Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB failed:", err);
  });
