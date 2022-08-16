import { ModelType } from "@typegoose/typegoose/lib/types";
import { RegionResponse } from "../../../db/model/admin/region/exception";
import { Region, RegionModel } from "../../../db/model/admin/region/region.model";
import { RegionGetDto } from "../../../validation/dto/admin/region/region.dto";
import { CommonServices } from "../../common.service";



class RegionService extends CommonServices<Region>{
    constructor(model: ModelType<Region>){
        super(model);
    }

    public async create(data){
        try {
            return await super.create(data);
        } catch (e) {
            if(e.code == 11000) throw RegionResponse.AllreadyExist(Object.keys(e.keyPattern));
            return e
        }
    }


    
    public async getPagingRegion<T>(data: RegionGetDto) {
        try {
            let query = {
                isDeleted: false
            };

            const $project = {
                $project: {
                    __v:0,
                   isDeleted:0
                }
            }


            const $pipeline = [
                $project
            ];
            return await this.findPaging(query, data, $pipeline)
        } catch (e) {
            return e;
        }
    }

    
    
}

export const regionService = new RegionService(RegionModel)