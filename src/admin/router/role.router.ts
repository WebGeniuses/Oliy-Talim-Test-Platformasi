import { Router } from "express";
import { createRoleHandler, getRoleByIdHandler, getRolePagingHandler } from "../handler/role/role.handler";
import { authToken } from "../middlewares/authToken";

const router = Router()
router.post('/', authToken, createRoleHandler);
router.get('/:_id', authToken, getRoleByIdHandler);
router.get('/', authToken, getRolePagingHandler)


export default router;