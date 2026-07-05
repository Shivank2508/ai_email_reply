import app from "./app"
import authRoutes from "./routes/auth.routes"
import emailRoutes from "./routes/email.routes"

app.use("/auth", authRoutes)
app.use("/email", emailRoutes)
const port = 8000

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})