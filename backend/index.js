import connectToMongo from "./db.js";
import express from "express";
import cors from "cors";
import cart from "./routes/cart.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
connectToMongo();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/cart", cart);

app.listen(port, () => {
  console.log(`Ecomm backend listening at http://localhost:${port}`);
});
