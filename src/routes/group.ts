import express from 'express';
const router = express.Router()
import { auth } from './middleware/auth';
import { createGroup, getGroup, getGroups, addUserToGroup } from '../controller/group';
import {accessControl} from './middleware/accessControl';


router.post('/creategroup',createGroup);
router.get('/getgroups',getGroups);
router.get('/getgroup/:id',getGroup);
router.post('/addusertogroup',addUserToGroup);