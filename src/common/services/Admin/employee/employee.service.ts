import { ModelType } from "@typegoose/typegoose/lib/types";
import { EmployeeResponse } from "../../../db/model/admin/employee/exception";
import { Employee, EmployeeModel } from "../../../db/model/admin/employee/models";
import { EmployeeDto, EmployeeGetDto } from "../../../validation/dto/admin/employee/employee.dto";
import { CommonServices } from "../../common.service";


class EmployeeService extends CommonServices<Employee>{
    constructor(model: ModelType<Employee>) {
        super(model);
    }

    public async findByIdError(id) {
        try {
            let admin = await this.model.findById(id);
            if (!admin) throw EmployeeResponse.notFound(id);
            return admin;
        } catch (e) {
            return  e;
        }
    }

    public async create(data) {
        try {
            return await super.create(data);
        } catch (e) {
            console.log("error/// /// /// ", e)
            if (e.code == 11000) throw EmployeeResponse.AllreadyExist(e)
            return  e;
        }
    }

    public async findByPhoneNumber(phone) {
        try {
            console.log("/// phone /// ",phone)
            let employee = await this.model.find({ phoneNumber: phone });
            console.log("////employee////   ",employee)
            if (employee.length==0)  throw EmployeeResponse.notFound(phone)
            return employee[0];
        } catch (e) {
            console.log(e)
            return  e;
        }
    }

    public async getPaging<T>(data:EmployeeGetDto){
            try {
                let query = {
                    isDeleted: false,
                };
    
                const $project = {
                    $project: {
                        _id: 1,
                        firstname:1,
                        lastname: 1,
                        phoneNumber: 1,
                        roleId: 1,
                    }
                };
                const $pipeline = [$project];
                return await this.findPaging(query, data, $pipeline);
            } catch (e) {
                throw e;
            }
    }
}

export const employeeService = new EmployeeService(EmployeeModel)