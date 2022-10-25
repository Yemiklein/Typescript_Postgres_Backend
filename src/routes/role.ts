import express from "express";
const router = express.Router();
import { auth } from "./middleware/auth";
import {
  createRole,
  getRoles,
  getRole,
  issueQuery,
  updateRole,
} from "../controller/role";
import { accessControl } from "./middleware/accessControl";



router.get("/getrole/:id", getRole);

router.get("/getroles", getRoles);

router.post("/createrole", auth, createRole);

router.get("/send_query_letter", accessControl, issueQuery);

router.post("/updaterole/:id", updateRole);

export default router;
