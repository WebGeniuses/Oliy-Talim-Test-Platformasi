import { Router } from "express";
import { createSubjectHandler, deleteSubjectHandler, getByIdSubjectHandler, getPagingSubjectHandler, updateSubjectHandler } from "../handler/class/subject/subject.handler";


const router = Router();
router.post("/", createSubjectHandler);
router.get('/', getPagingSubjectHandler);
router.get('/:_id', getByIdSubjectHandler);
router.put('/', updateSubjectHandler);
router.delete('/:_id',deleteSubjectHandler);


export  default router;