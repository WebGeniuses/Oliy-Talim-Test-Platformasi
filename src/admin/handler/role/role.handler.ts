import { Roles } from "../../../common/constants/roles";
import { RoleResponse } from "../../../common/db/model/admin/role/exception";
import { roleService } from "../../../common/services/Admin/role/role.service";
import { RoleDto, RoleDtoGroup, RoleGetDto } from "../../../common/validation/dto/admin/role/role.dto";
import { BaseDto, DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";


export async function createRoleHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId.toString(),Roles.ROLE_CREATE)
        const data = await validateIt(req.body, RoleDto,RoleDtoGroup.CREATE)
        const role = await roleService.create(data);
        return res.send(RoleResponse.Success(role._id));
    } catch (e) {
        return next(e);
    }
}

export async function getRoleByIdHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.ROLE);
        const valid = await validateIt(req.params, BaseDto, DtoGroups.GET_BY_ID);
        const data = await roleService.findByIdError(valid._id);
        console.log(data)
        return res.send(RoleResponse.Success(data))
    } catch (e) {
        return  next(e);
    }
}



export async function getRolePagingHandler(req, res, next) {
    try {
        // await roleService.hasAccess(request.roleId, Roles.ROLE)

        const data = await validateIt(req.query, RoleGetDto, [RoleDtoGroup.PAGENATION])
        console.log("----- --- - data:   ---  ",data);
  
        const roles = await roleService.getpaging(data)
console.log("----- --- - roles:   ---  ",roles);
        const allRoles = await roleService.getCount()

        const result = {
            data: roles,
            allRoles // rollar soni
        }

        return res.send(RoleResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}