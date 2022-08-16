import { Router } from "express";
import { createCategoryHandler, deleteCategoryHandler, getByIdCategoryHandler, getPagingCategory, updateCategoryHandler } from "../handler/category/category.handler";

const router = Router();

router.post('/', createCategoryHandler);
router.get('/:_id', getByIdCategoryHandler);
router.get("/", getPagingCategory);
router.put('/', updateCategoryHandler);
router.delete('/:_id', deleteCategoryHandler);


export default router;