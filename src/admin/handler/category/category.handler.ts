import { Roles } from "../../../common/constants/roles";
import { CategoryResponse } from "../../../common/db/model/admin/category/exceptions";
import { categoryService } from "../../../common/services/Admin/category/category.service";
import { roleService } from "../../../common/services/Admin/role/role.service";
import { CategoryDto, CategoryGetDto } from "../../../common/validation/dto/admin/category/category.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";



export async function createCategoryHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY_CREATE);
        const data = await validateIt(req.body, CategoryDto, DtoGroups.CREATE);
        const category = await categoryService.create(data);
        return res.send(CategoryResponse.Success(category));
    } catch (e) {
        return next(e);
    }
}


export async function getPagingCategory(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY);
        const data = await validateIt(req.query, CategoryGetDto, DtoGroups.PAGENATION);
        const category = await categoryService.getPagingCategory(data);
        return await res.send(CategoryResponse.Success(category))
    } catch (e) {
        return next(e);
    }
}

export async function updateCategoryHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY_UPDATE);
        const data = await validateIt(req.body, CategoryDto, DtoGroups.UPDATE )
        const category = await categoryService.findById(data._id);
        if(!category) throw CategoryResponse.NotFound(data);
        const updateCategory = await categoryService.updateOne(data._id, data)
        return await res.send(CategoryResponse.Success(updateCategory));
    
    } catch (e) {
        return next(e);
    }
}

export async function getByIdCategoryHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY);
        const data = await validateIt(req.params, CategoryDto, DtoGroups.GET_BY_ID);
        const category = await categoryService.findById(data._id);
        if(!category) throw CategoryResponse.NotFound(data);
        return await res.send(CategoryResponse.Success(category));
    } catch (e) {
        return next(e);
    }
}

export async function deleteCategoryHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CATEGORY_DELETE);
        const data = await validateIt(req.params, CategoryDto, DtoGroups.DELETE);
        const category = await  categoryService.findById(data._id);
        console.log("category:  ", category)
        if(!category) throw CategoryResponse.NotFound(data);
        const deleteCategory = await categoryService.deleteOne(category._id);
        return await res.send(CategoryResponse.Success(deleteCategory));
    } catch (e) {
        return next(e);
    }
    
}