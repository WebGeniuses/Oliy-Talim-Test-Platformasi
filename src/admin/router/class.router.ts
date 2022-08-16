import { Router } from "express";
import { createClassHandler, deleteClassHandler, getByIdClassHandler, getPagingClassHandler, updateClassHandler } from "../handler/class/class.handler";

const router = Router()
router.post("/", createClassHandler);
router.get('/:_id', getByIdClassHandler);
router.get("/", getPagingClassHandler);
router.put('/', updateClassHandler);
router.delete('/:_id', deleteClassHandler);


export default router;