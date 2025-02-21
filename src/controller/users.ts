import express from "express";
const router = express.Router();
import { User } from "../entity/User";
import { dataSource } from "../data-source";

/* GET users listing. */
router.get("/get", async function (req, res) {
  const users = await dataSource.getRepository(User).find();
  res.json(users);
});

router.get("/add", async function (req, res) {
  const user = new User();
  user.id = 1;
  user.firstName = "第一个";
  user.lastName = "最后一个";
  await dataSource.manager.save(user);
  res.send("成功");
});

export default router;
