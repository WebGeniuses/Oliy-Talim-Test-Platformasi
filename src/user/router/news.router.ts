import { Router } from "express";
import { getByIdNewsHandler, getPagingNewsHandler } from "../handler/news/news.handler";
import { userToken } from "../middlewares/userToken";

const router = Router();

router
    .get('/getbyId/:_id', userToken, getByIdNewsHandler)
    .get('/paging', userToken, getPagingNewsHandler)


export default router;