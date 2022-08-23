import { Router } from "express";
import { authToken } from "../../admin/middlewares/authToken";
import { finishedQuizHandler, getDoneTestPagingHandler, registerTestHandler } from "../handler/class/subject/chapter/thema/test/quiz/quiz.handler";
import { userToken } from "../middlewares/userToken";

const router = Router()

router.post('/register', userToken, registerTestHandler);
router.post('/finish', userToken, finishedQuizHandler)
router.get('/', userToken, getDoneTestPagingHandler);

export default router;