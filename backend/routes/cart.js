import express from "express";
import { addproduct, getdata, checkout } from "../controller/handlecart.js";
const router = express.Router();
router.post("/addproduct", addproduct);
// router.post("/verify", verifydata);

router.get("/getall", getdata);
router.delete("/checkout", checkout);
export default router;
