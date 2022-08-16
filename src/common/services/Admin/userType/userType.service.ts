import { ModelType } from "@typegoose/typegoose/lib/types";
import { UserType, userTypeModel } from "../../../db/model/admin/userType/userType.model";
import { CommonServices } from "../../common.service";


class UserTypeService extends CommonServices<UserType>{
    constructor(model: ModelType<UserType>){
        super(model);
    }

    public async create(data){
        try {
            return await super.create(data);
        } catch (e) {
            return e;
        }
    }
}

export const userTypeService = new UserTypeService(userTypeModel);