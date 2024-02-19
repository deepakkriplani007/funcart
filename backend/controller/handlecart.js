import Cart from "../models/Cart.js";

export const addproduct = async (req, res, next) => {
  const cart = req.body.formData;
  console.log(cart);
  try {
    const updatedobj = await Cart.findOneAndUpdate(
      { uid: cart.uid, product: cart.product },
      { $inc: { quantity: cart.quantity } },
      { new: true }
    );

    if (updatedobj) {
      res.json({ success: true, updatedobj });
    } else {
      try {
        const newForm = new Cart(cart);
        await newForm.save();
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const getdata = async (req, res, next) => {
  const uid = req.query.param1;
  const data = await Cart.find({ uid: uid });
  console.log(data);
  res.send(data);
};
export const checkout = async (req, res, next) => {
  try {
    await Cart.deleteMany({});

    res.json({ success: true, message: "All data deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
