import express from 'express';
const router = express.Router()
import { auth } from './middleware/auth';
import { LoginUser, RegisterUser,getUser,createGroup,createRole,getRoles,getRole,getGroup,getGroups,addUserToGroup,getAllUser,issueQuery,updateRole } from '../controller/user';
import {accessControl} from './middleware/accessControl';


router.post('/create', RegisterUser);
router.get('/getuser/:id', getUser);
router.post('/login', LoginUser);
router.get('/getalluser', getAllUser);






export default router;
