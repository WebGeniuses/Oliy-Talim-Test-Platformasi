import { Router } from "express";
import { getByIdTestHandler, getPagingTestHandler } from "../handler/class/subject/chapter/thema/test/test.handler";
import { userToken } from "../middlewares/userToken";

const router = Router();

router
    .get('/getbyId/:_id', userToken, getByIdTestHandler)
    .get('/paging', userToken, getPagingTestHandler)


export default router;