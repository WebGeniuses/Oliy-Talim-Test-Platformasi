import { Roles } from "../../../common/constants/roles";
import { ClassResponse } from "../../../common/db/model/admin/class/exception";
import { classService } from "../../../common/services/Admin/class/class.service";
import { roleService } from "../../../common/services/Admin/role/role.service";
import { ClassDto, ClassGetDto } from "../../../common/validation/dto/admin/class/class.dto";
import { EmployeeDto } from "../../../common/validation/dto/admin/employee/employee.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";


export async function createClassHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CLASS_CREATE);
        const data = await validateIt(req.body, ClassDto, DtoGroups.CREATE);
        const Class = await classService.createClass(data);
        return res.send(ClassResponse.Success(Class));
    } catch (e) {
        return next(e);
    }
}

export async function getByIdClassHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CLASS)
        const data = await validateIt(req.params, ClassDto, DtoGroups.GET_BY_ID)
        const Class = await classService.findById(data._id);
        if(!Class) throw ClassResponse.notFound(data._id);
        return res.send(ClassResponse.Success(Class));
    } catch (error) {
        return next(error)
    }
}

export async function getPagingClassHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CLASS);
        const data = await validateIt(req.query, ClassGetDto, DtoGroups.PAGENATION) ;
        const Class = await classService.getPagingClass(data);
        console.log(Class)
        const count = await classService.getCount();
        const resault = {
            data: Class,
            ClassCount: count
        }
        return res.send(ClassResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}

export async function updateClassHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CLASS_UPDATE);
        const data = await validateIt(req.body, ClassDto, DtoGroups.UPDATE);
        const id  = data._id;
        const Class = await classService.findById(id);
        console.log(Class);
        if(!Class) throw ClassResponse.notFound(id);
        const updateClass = await classService.updateOne(id, data);
        console.log("Update  $$$$$   ",updateClass);
        const resault = await classService.findById(updateClass);
        return res.send(ClassResponse.Success(resault));

    } catch (e) {
        return next(e);
    }
}

export async function deleteClassHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CLASS_DELETE);
        const data = await validateIt(req.params, ClassDto, DtoGroups.DELETE);
        const Class = await classService.findById(data._id);
        console.log(Class);
        if(!Class) throw ClassResponse.notFound(data._id);
        const del = await classService.deleteOne(Class._id);
      const resault = {
        deleted: del._id
      }
        return res.send(ClassResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}