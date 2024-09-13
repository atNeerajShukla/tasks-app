import { config } from "dotenv";
import { app } from "./app.js";
import connectDB from "./config/db.js";

config();
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })