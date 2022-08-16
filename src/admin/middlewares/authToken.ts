import { request } from "http";
import { BaseResponse } from "../../common/reporter/base.response";
import { employeeService } from "../../common/services/Admin/employee/employee.service";
import { jwt } from "../../common/utils/jwt";


export async function authToken(req, res, next) {
    try {
        const {phoneNumber} = jwt.verify(req.headers.token);
console.log(phoneNumber)
        const employee = await employeeService.findByIdError(phoneNumber);
        console.log(employee)
        req.roleId = employee.roleId;
        req.employeeId = employee._id;
        return next();
    } catch (e) {
        return next(BaseResponse.UnAuthorizationError(e));
    }
}