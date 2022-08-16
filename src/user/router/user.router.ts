import { Router } from "express";
import { deleteUserHandler, loginHandler, registerHandler, updateUserHandler, verifyHandler } from "../handler/users/user.handler";
import { userToken } from "../middlewares/userToken";


const router = Router();
router.post('/', registerHandler);
router.patch('/',loginHandler),
router.get('/', verifyHandler);
router.put('/',userToken, updateUserHandler);
router.delete('/',userToken, deleteUserHandler);


export default router;