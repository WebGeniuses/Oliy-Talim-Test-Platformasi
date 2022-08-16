import { ModelType } from "@typegoose/typegoose/lib/types";
import { NewsType, NewsTypeModel } from "../../../../db/model/admin/news/newsType/newsType.model";
import { NewsTypeGetDto } from "../../../../validation/dto/admin/news/newsType.dto.ts/newsType.dto";
import { CommonServices } from "../../../common.service";




class NewsTypeService extends CommonServices<NewsType>{
    constructor(model: ModelType<NewsType>){
        super(model);
    }

    public async create(data){
        try {
            return await super.create(data);
        } catch (e) {
            return e
        }
    }

    public async getPagingNewsType<T>(data: NewsTypeGetDto) {
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

export const newsTypeService = new NewsTypeService(NewsTypeModel)