import express from "express";
const router = express.Router();
import { auth } from "./middleware/auth";
import {
  LoginUser,
  RegisterUser,
  getUser,
  getAllUser,
  deleteUser,
} from "../controller/user";
import { accessControl } from "./middleware/accessControl";

router.post("/create", RegisterUser);

router.post("/login", LoginUser);

router.get("/getuser/:id", auth, getUser);

router.get("/getalluser",accessControl, getAllUser);

router.delete("/deleteuser/:id", auth, accessControl, deleteUser);

export default router;
