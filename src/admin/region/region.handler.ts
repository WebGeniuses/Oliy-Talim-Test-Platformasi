import { RegionResponse } from "../../common/db/model/admin/region/exception";
import { regionService } from "../../common/services/Admin/region/region.service";
import { RegionDto, RegionGetDto } from "../../common/validation/dto/admin/region/region.dto";
import { DtoGroups } from "../../common/validation/dtoGroups.dto";
import { validateIt } from "../../common/validation/validate";


export async function createRegionandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY_CREATE);
        const data = await validateIt(req.body, RegionDto, DtoGroups.CREATE);
        const region = await regionService.create(data);
        return res.send(RegionResponse.Success(region));
    } catch (e) {
        return next(e);
    }
}


export async function getPagingRegion(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY);
        const data = await validateIt(req.query, RegionGetDto, DtoGroups.PAGENATION);
        const region = await regionService.getPagingRegion(data);
        return await res.send(RegionResponse.Success(region))
    } catch (e) {
        return next(e);
    }
}

export async function updateRegionHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY_UPDATE);
        const data = await validateIt(req.body, RegionDto, DtoGroups.UPDATE )
        const region = await regionService.findById(data._id);
        if(!region) throw RegionResponse.NotFound(data);
        const updateCategory = await regionService.updateOne(data._id, data)
        return await res.send(RegionResponse.Success(updateCategory));
    
    } catch (e) {
        return next(e);
    }
}

export async function getByIdRegionHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY);
        const data = await validateIt(req.params, RegionDto, DtoGroups.GET_BY_ID);
        const region = await regionService.findById(data._id);
        if(!region) throw RegionResponse.NotFound(data);
        return await res.send(RegionResponse.Success(region));
    } catch (e) {
        return next(e);
    }
}

export async function deleteRegionHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY_DELETE);
        const data = await validateIt(req.params, RegionDto, DtoGroups.DELETE);
        const region = await  regionService.findById(data._id);
        if(!region) throw RegionResponse.NotFound(data);
        const deleteCategory = await regionService.deleteOne(data._id);
        return await res.send(RegionResponse.Success(deleteCategory));
    } catch (e) {
        return next(e);
    }
    
}