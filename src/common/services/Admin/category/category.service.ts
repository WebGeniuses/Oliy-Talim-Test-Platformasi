import { ModelType } from "@typegoose/typegoose/lib/types";
import { Model, Types } from "mongoose";
import { CollectionNames } from "../../../constants/collections";
import { Category, CategoryModel } from "../../../db/model/admin/category/category.model";
import { CategoryResponse } from "../../../db/model/admin/category/exceptions";
import { CategoryGetDto } from "../../../validation/dto/admin/category/category.dto";
import { CommonServices } from "../../common.service";



class CategoryService extends CommonServices<Category>{
    constructor(model: ModelType<Category>){
        super(model);
    }

    public async create(data){
        try {
            return await super.create(data);
        } catch (e) {
            // if(e.code == 11000) throw CategoryResponse.AllreadyExist(Object.keys(e.keyPattern));
            return e
        }
    }


    public async getPagingCategory<T>(data: CategoryGetDto) {
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

export const categoryService = new CategoryService(CategoryModel)