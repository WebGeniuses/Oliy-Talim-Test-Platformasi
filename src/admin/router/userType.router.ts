import { Router } from "express";
import { createUserTypeHandler } from "../handler/userType/userType.handler";

const router = Router();

router.post('/', createUserTypeHandler);

export default router;