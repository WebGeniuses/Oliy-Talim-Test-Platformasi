import { Router } from "express";
import { createQuestionHandler, deleteQuestionHandler, getPagingQuestion, updateQuestionHandler } from "../handler/class/subject/chapter/thema/test/question/question.handler";


const router = Router();

router.post('/',createQuestionHandler);
router.get('/', getPagingQuestion);
router.put('/', updateQuestionHandler);
router.delete('/:_id', deleteQuestionHandler);


export default  router;