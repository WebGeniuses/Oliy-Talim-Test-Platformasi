import { ModelType } from "@typegoose/typegoose/lib/types";
import { EmployeeResponse } from "../../../db/model/admin/employee/exception";
import { RoleResponse } from "../../../db/model/admin/role/exception";
import { Role, RoleModel } from "../../../db/model/admin/role/models";
import { RoleDto, RoleGetDto } from "../../../validation/dto/admin/role/role.dto";
import { CommonServices } from "../../common.service";

class RoleService extends CommonServices<Role> {
    constructor(model: ModelType<Role>) {
        super(model);
    }

    public async findByIdError(id) {
        try {
            const role = await this.findById(id);
            if (!role) throw RoleResponse.NotFound(id)
            return role;
        } catch (e) {
            return e
        }
    }
    

    public async create(data: RoleDto) {
        try {
            return await super.create(data);
        } catch (e) {
            if (e.code == 11000) throw RoleResponse.AlreadyExists(Object.keys(e.keyPattern))
            throw e;
        }
    }

    public async getpaging<T>(dto: RoleGetDto) {
        try {
            let query = {
                isDeleted: false,
            };

            const $project = {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1
                },
            };

            const $pipeline = [$project];
            return await this.findPaging(query, dto, $pipeline);
        } catch (e) {
            throw e;
        }
    }

    ////tekshirish
    public async hasAccess(id: string, access: string) {
        try {
          const role = await this.findById(id);
          
          if(!role) throw RoleResponse.NotFound(id)
    
          if (!role[access] || role.isDeleted) throw EmployeeResponse.NotEnoughPermission();
        } catch (error) {
          console.log(99, error.message);
    
          throw error
        }
      }
}

export const roleService = new RoleService(RoleModel)