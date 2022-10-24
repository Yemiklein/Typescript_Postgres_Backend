import express from 'express';
const router = express.Router()
import { auth } from './middleware/auth';
import { LoginUser, RegisterUser,getUser,createGroup,createRole,getRoles,getRole,getGroup,getGroups,addUserToGroup,getAllUser,issueQuery } from '../controller/user';
import {accessControl} from './middleware/accessControl';


router.post('/create', RegisterUser);
router.get('/getuser/:id', getUser);
router.post('/login', LoginUser);
router.post('/creategroup',createGroup);
router.post('/createrole',createRole);
router.get('/getroles',getRoles);
router.get('/getrole/:id',getRole);
router.get('/getgroups',getGroups);
router.get('/getgroup/:id',getGroup);
router.post('/addusertogroup',addUserToGroup);
router.get('/getalluser', getAllUser);
router.get('/issuequery',accessControl,issueQuery);




export default router;
