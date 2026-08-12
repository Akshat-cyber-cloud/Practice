import express from "express";
import {getUsers , getUserById , createUser , updateUserDetails , deleteUser} from "../controller/user.controller.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users/createuser', createUser);
router.patch('/users/updateuser/:id', updateUserDetails);
router.delete('/users/deleteuser/:id', deleteUser);

export default router;