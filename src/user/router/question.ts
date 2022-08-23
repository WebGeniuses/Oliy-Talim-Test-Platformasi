import { Router } from "express";
import { getPagingQuestion } from "../handler/class/subject/chapter/thema/test/question/question.handler";
import { userToken } from "../middlewares/userToken";

const router = Router()
router.get('/', userToken, getPagingQuestion)


export default router;