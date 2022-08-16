import { Router } from "express";
import {
    createNewsTypeHandler,
    updateNewsTypeHandler,
    getByIdNewsTypeHandler,
    getPagingNewsTypeHandler,
    deleteNewsTypeHandler
} from "../handler/news/news.type.handler.ts/newsType.handler";

const router = Router();

router.post('/', createNewsTypeHandler);
router.get('/:_id', getByIdNewsTypeHandler);
router.put("/", updateNewsTypeHandler);
router.delete('/:_id', deleteNewsTypeHandler);
router.get('/', getPagingNewsTypeHandler);

export default router;


