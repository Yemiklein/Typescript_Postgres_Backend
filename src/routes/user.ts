import express from 'express';
const router = express.Router()
import { auth } from './middleware/auth';
import { LoginUser, RegisterUser, getUser, getAllUser} from '../controller/user';
import {accessControl} from './middleware/accessControl';


router.post('/create', RegisterUser);
router.get('/getuser/:id', getUser);
router.post('/login', LoginUser);
router.get('/getalluser', getAllUser);






export default router;
