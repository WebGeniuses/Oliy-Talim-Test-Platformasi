import { Router } from "express";
import { createTesthandler, deleteTestHandler, getByIdTestHandler, getPagingTestHandler, updateTestHandler } from "../handler/class/subject/chapter/thema/test/test.handler";


const router = Router()

router.post('/', createTesthandler);
router.get('/', getPagingTestHandler);
router.get('/:_id', getByIdTestHandler);
router.put("/", updateTestHandler);
router.delete("/:_id", deleteTestHandler);


export default router;