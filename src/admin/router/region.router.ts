import { Router } from "express";
import {
    createRegionandler,
    deleteRegionHandler,
    getByIdRegionHandler,
    getPagingRegion,
    updateRegionHandler
} from "../region/region.handler";

const router = Router();

router.post('/', createRegionandler);
router.get('/:_id', getByIdRegionHandler);
router.get("/", getPagingRegion);
router.put('/', updateRegionHandler);
router.delete('/:_id', deleteRegionHandler);


export default router;