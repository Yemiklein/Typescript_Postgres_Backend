import express from 'express';
const router = express.Router();
import { auth } from './middleware/auth';
import { LoginUser, RegisterUser, getUser, getAllUser} from'../controller/user';
import {accessControl} from './middleware/accessControl';


router.post('/create', RegisterUser);

router.post('/login', LoginUser);

router.get('/getuser/:id',auth, getUser);

router.get('/getalluser',auth, accessControl, getAllUser);






export default router;
