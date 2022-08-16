import { Router } from "express";
import { creatNewsHandler, deleteNewsHandler, getByIdNewsHandler, getPagingNewsHandler, updateNewsHandler } from "../handler/news/news.handler";


const router = Router();
router.post('/',creatNewsHandler);
router.get('/', getPagingNewsHandler);
router.get('/:_id', getByIdNewsHandler);
router.put("/", updateNewsHandler);
router.delete('/:_id', deleteNewsHandler)
export default router