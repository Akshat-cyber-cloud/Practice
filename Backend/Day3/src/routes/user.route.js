import express from "express";
import {getUsers , getUserById , createUser , updateUserDetails , deleteUser, registerUser, loginUser} from "../controller/user.controller.js";

const router = express.Router();
/** 
 * CRUD Operations
*/
router.get('/users', getUsers);           
router.get('/users/:id', getUserById);     
router.post('/users', createUser);         
router.patch('/users/:id', updateUserDetails); 
router.delete('/users/:id', deleteUser);   

router.post('/register', registerUser);
router.get('/login', loginUser);

export default router;