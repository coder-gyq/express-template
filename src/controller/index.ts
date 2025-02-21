import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("respond with a resource123");
});

export default router;
