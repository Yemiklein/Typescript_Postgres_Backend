import express from "express";
const router = express.Router();
import { auth } from "./middleware/auth";
import {
  createRole,
  getRoles,
  getRole,
  issueQuery,
  updateRole,
  securityCheck,
  BranchManager,
} from "../controller/role";
import { accessControl } from "./middleware/accessControl";



router.get("/getrole/:id", auth, getRole);

router.get("/getroles", getRoles);

router.post("/createrole", createRole);

router.get("/issuequery", accessControl, issueQuery);

router.get("/security_check", accessControl, securityCheck);

router.get("/branch_manager", accessControl, BranchManager);

router.post("/updaterole/:id", accessControl, updateRole);



export default router;
