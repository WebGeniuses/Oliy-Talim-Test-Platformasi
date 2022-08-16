import { Router } from "express";
import { getByIdClassHandler, getPagingClassHandler } from "../handler/class/class.handler";
import { userToken } from "../middlewares/userToken";

const router = Router();

router
    .get('/getbyId/:_id', userToken,getByIdClassHandler, )
    .get('/paging', userToken, getPagingClassHandler)


export default router;