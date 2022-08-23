import { ModelType } from "@typegoose/typegoose/lib/types";
import { Class, ClassModel } from "../../../db/model/admin/class/model";
import { ClassResponse } from "../../../db/model/admin/class/exception";
import { ClassGetDto } from "../../../validation/dto/admin/class/class.dto";
import { CommonServices } from "../../common.service";

class ClassService extends CommonServices<Class>{
    constructor(model: ModelType<Class>) {
        super(model);
    }


    public async createClass(data) {
        try {
            return await super.create(data);
        } catch (e) {
            if (e.code == 11000) throw ClassResponse.AllreadyExist(e);
            return e;
        }
    }

   


    ///get paging
    public async getPagingClass<T>(data: ClassGetDto){
        try {
            let query = {
                isDeleted:false
            };

            const $project = {
                $project:{
                    __v:0,
                    isDeleted:0
                }
            };

            const $pipeline = [$project];
            return await this.findPaging(query, data, $pipeline);
        } catch (e) {
            return e;
        }
    }
}

export const classService = new ClassService(ClassModel);