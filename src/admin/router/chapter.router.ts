import { Router } from "express";
import { createChapterHandler, deleteChapterHandler, getByIdChapterHandler, getPagingChapterHandler, updateChapterHandler } from "../handler/class/subject/chapter/chapter.handler";


const router = Router();
router.post("/", createChapterHandler);
router.get("/", getPagingChapterHandler);
router.get('/:_id', getByIdChapterHandler);
router.put('/', updateChapterHandler);
router.delete('/:_id', deleteChapterHandler);

export default router;