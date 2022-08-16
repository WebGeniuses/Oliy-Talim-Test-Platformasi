import { roleService } from "../../../common/services/Admin/role/role.service";
import { EmployeeDto, EmployeeDtoGroups, EmployeeGetDto } from "../../../common/validation/dto/admin/employee/employee.dto";
import { validateIt } from "../../../common/validation/validate";
import sha256 from "sha256";
import { employeeService } from "../../../common/services/Admin/employee/employee.service";
import { EmployeeResponse } from "../../../common/db/model/admin/employee/exception";
import { jwt } from "../../../common/utils/jwt";
import { Roles } from "../../../common/constants/roles";

export async function creatEmployeeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE);
        const data = await validateIt(req.body, EmployeeDto, EmployeeDtoGroups.CREATE);

        data.password = sha256(data.password);
        console.log(data)
        const employee = await employeeService.create(data);;
        return res.send(EmployeeResponse.Success(employee._id))

    } catch (e) {
        return next(e);
    }
}

export async function findEmployeByPhonenumber(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE);

        const data = await validateIt(req.query, EmployeeDto, EmployeeDtoGroups.GET)
        console.log("/// /// ///  data  /// /// /// ", req.query.phoneNumber);
        const employee = await employeeService.findByPhoneNumber(data.phoneNumber);
        console.log("============================")
        console.log(employee)
        return res.send(employee)
    } catch (e) {
        return next(e);
    }

}

export async function findEmployeeByIdHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE);

        const data = await validateIt(req.query, EmployeeDto, EmployeeDtoGroups.GET_BY_ID);
        const employee = await employeeService.findByIdError(data._id);
        return res.send(EmployeeResponse.Success(employee));
    } catch (e) {
        return next(e);
    }

}

export async function updateEmployeeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE);

        const data = await validateIt(req.body, EmployeeDto, EmployeeDtoGroups.UPDATE);

        const id = data._id;
        let employee = await employeeService.findById(id);
        if (!employee._id) throw EmployeeResponse.NotFound();

        console.log(employee.password)
        if (data.password) {
            data.password = sha256(data.password)
        }

        const updateEmployee = await employeeService.updateOne(id, data);
        const re = await employeeService.findById(id)
        console.log(re)
        return res.send(EmployeeResponse.Success(updateEmployee._id));

    } catch (e) {
        return next(e);
    }
}


export async function deleteEmployeeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE);

        const data = await validateIt(req.params, EmployeeDto, EmployeeDtoGroups.DELETE)
        const employee = await employeeService.findById(data._id);
        console.log(employee)
        const del = await employeeService.deleteOne(employee._id)
        console.log('del: ', del);
        return res.send(EmployeeResponse.Success(del._id));

    } catch (e) {
        return next(e);
    }
}


export async function signInHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, EmployeeDto, EmployeeDtoGroups.LOGIN);
        console.log(data)
        const employee = await employeeService.findByPhoneNumber(data.phoneNumber);

        console.log("pasword 1 :  ", (data.password))
        console.log("pasword 2---- :  ", (employee.password))

        if (sha256(data.password) != employee.password) throw EmployeeResponse.InvalidPassword(data.password);
        const token = jwt.sign({ phoneNumber: employee.phoneNumber });
        return res.send(EmployeeResponse.Success({
            token,
            employee: {
                _id: employee._id,
                firstname: employee.firstname,
                lastname: employee.lastname,
                phoneNumber: employee.phoneNumber
            }
        }))
    } catch (e) {
        return next(e);
    }

}

export async function getPagingEmployeeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE);

        const data = await validateIt(req.query, EmployeeGetDto, EmployeeDtoGroups.PAGENATION);
        console.log("............data.........", data)
        const employee = await employeeService.getPaging(data);
        console.log("............employee.........", employee)
        const count = await employeeService.getCount();
        const resault = {
            data: employee,
            EmployeesCount: count
        }
        return res.send(EmployeeResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}


