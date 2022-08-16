import { Router } from "express";
import { createThemaHandler, deleteThemaHandler, getByIdThemaHandler, getPagingThemaHandler, updateThemaHandler } from "../handler/class/subject/chapter/thema/thema.handler";

const router = Router();
router.post('/',createThemaHandler);
router.get("/",getPagingThemaHandler);
router.get('/:_id', getByIdThemaHandler);
router.put('/', updateThemaHandler);
router.delete('/:_id', deleteThemaHandler)

export default router;