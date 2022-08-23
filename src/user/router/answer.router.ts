import { Router } from "express";
import { createAnswerHandler } from "../handler/class/subject/chapter/thema/test/answer/answer.handler";
import { userToken } from "../middlewares/userToken";

const router = Router();

router.post('/',userToken ,createAnswerHandler)








export default router;