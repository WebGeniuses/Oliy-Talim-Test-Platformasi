import { Router } from "express";
import { getByIdThemaHandler, getPagingThemaHandler } from "../handler/class/subject/chapter/thema/thema.handler";
import { userToken } from "../middlewares/userToken";

const router = Router();

router
    .get('/getbyId/:_id', userToken, getByIdThemaHandler)
    .get('/paging', userToken, getPagingThemaHandler)


export default router;