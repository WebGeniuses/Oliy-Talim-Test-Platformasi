import { Router } from "express";
import { getByIdSubjectHandler, getPagingSubjectHandler } from "../handler/class/subject/subject.handler";
import { userToken } from "../middlewares/userToken";

const router = Router();

router
    .get('/getbyId/:_id', userToken, getByIdSubjectHandler )
    .get('/paging', userToken, getPagingSubjectHandler)


export default router;