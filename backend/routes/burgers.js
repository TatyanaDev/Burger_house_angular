const { Router } = require("express");
const path = require("path");
const fs = require("fs");

const BurgerRouter = Router();

BurgerRouter.get("/burgers-data", (req, res) => {
  const burgersFilePath = path.join(__dirname, "../data", "burgers.json");

  fs.readFile(burgersFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("❌ JSON reading error:", err);
      return res.status(500).json({ error: "Server error when reading a file" });
    }

    try {
      const burgers = JSON.parse(data);

      const { extra } = req.query;

      const result = extra === "black" ? burgers : burgers.slice(0, 12);

      res.status(200).json(result);
    } catch (parseErr) {
      console.error("❌ JSON parsing error:", parseErr);
      res.status(500).json({ error: "JSON parsing error" });
    }
  });
});

BurgerRouter.post("/burgers-order", (req, res) => {
  const { name, order, phone } = req.body;

  console.log("📦 New order:", { name, order, phone });

  res.status(200).json({
    message: "Спасибо за заказ. Мы скоро свяжемся с вами!",
    success: 1,
  });
});

module.exports = BurgerRouter;
