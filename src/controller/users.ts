import express from "express";
const router = express.Router();
import { User } from "../entity/User";
import { mysql } from "../dataSource";

/* GET users listing. */
router.get("/get", async function (req, res) {
  const users = await mysql.getRepository(User).find();
  res.json(users);
});

router.get("/add", async function (req, res) {
  const user = new User();
  user.firstName = "第一个";
  user.lastName = "最后一个";
  await mysql.manager.save(user);
  res.send("成功");
});

export default router;
