import { UserTypeResponse } from "../../../common/db/model/admin/userType/exception";
import { roleService } from "../../../common/services/Admin/role/role.service";
import { userTypeService } from "../../../common/services/Admin/userType/userType.service";
import { UserTypeDto } from "../../../common/validation/dto/admin/userType/userType.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";


export async function createUserTypeHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.);
        const data = await validateIt(req.body, UserTypeDto, DtoGroups.CREATE);
        const userType = await userTypeService.create(data);
        return await res.send(UserTypeResponse.Success(userType));
    } catch (e) {
        return next(e);
    }
}