import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { CollectionNames } from "../../../constants/collections";
import { News, NewsModel } from "../../../db/model/admin/news/news.model";
import { NewsGetDto } from "../../../validation/dto/admin/news/news.dto";
import { CommonServices } from "../../common.service";


class NewsService extends CommonServices<News> {
    constructor(model: ModelType<News>) {
        super(model);
    }

    public async create(data) {
        try {
            return await super.create(data);
        } catch (e) {
            throw e;
        }
    }


    public async getPagingNewsWithCategory<T>(data: NewsGetDto) {
        try {
            let query = {
                isDeleted: false,
                categoryId: new Types.ObjectId(data.categoryId)
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



    public async getPagingNews<T>(data: NewsGetDto) {
        try {
            let query = {
                isDeleted: false,
                // categoryId: new Types.ObjectId(data.categoryId)
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

export const newsService = new NewsService(NewsModel);
