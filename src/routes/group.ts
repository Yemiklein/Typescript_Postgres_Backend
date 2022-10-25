import express from "express";
const router = express.Router();
import { auth } from "./middleware/auth";
import {
  createGroup,
  getGroup,
  getGroups,
  addUserToGroup,
} from "../controller/group";
import { accessControl } from "./middleware/accessControl";



router.post("/creategroup", accessControl, createGroup);

router.get("/getgroups", accessControl, getGroups);

router.get("/getgroup/:id", auth, getGroup);

router.post("/addusertogroup", accessControl, addUserToGroup);

export default router; 
