import { Router } from "express";
import { getByIdChapterHandler, getPagingChapterHandler } from "../handler/class/subject/chapter/chapter.handler";
import { userToken } from "../middlewares/userToken";

const router = Router();

router
    .get('/getbyId/:_id', userToken, getByIdChapterHandler)
    .get('/paging', userToken, getPagingChapterHandler)


export default router;