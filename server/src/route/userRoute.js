import express from "express";
import { loginUser, registerUser } from "../controller/userController";
const router = express.Router();

const userRoutes = (app) => {
  router.get("/", (req, res) => {
    res.render("./helloworld.ejs");
  });
  router.post("/register", registerUser);
  router.post("/login", loginUser);
  app.use("/api", router);
};

export default userRoutes;
