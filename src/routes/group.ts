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



router.post("/CreateGroup", accessControl, createGroup);

router.get("/getgroups", getGroups);

router.get("/getgroup/:id", auth, getGroup);

router.post("/addusertogroup",  addUserToGroup);

export default router; 
