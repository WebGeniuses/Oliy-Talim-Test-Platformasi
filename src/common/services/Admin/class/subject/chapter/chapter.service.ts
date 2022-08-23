import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Chapter, ChapterModel } from "../../../../../db/model/admin/class/subject/chapter/model";
import { ChapterGetDto } from "../../../../../validation/dto/admin/class/subject/chapter/chapter.dto";
import { CommonServices } from "../../../../common.service";


class ChapterService extends CommonServices<Chapter>{
    constructor(model: ModelType<Chapter>){
        super(model);
    }

    public async  createChapter(data){
        try {
            return await super.create(data);
        } catch (e) {
            return e;
        }
    }


    public async getpagingChapter<T>(data: ChapterGetDto){
        try {
            let query = {
                isDeleted:false,
                subjectId: new Types.ObjectId(data.subjectId)
            };

            const $project = {
                $project: {
                    _id:1,
                    chapterName:1,
                    subjectId:1,
                }
            }
            const $pipeline = [$project]
            return await this.findPaging(query, data, $pipeline)
        } catch (e) {
            return e;
        }
    }
}

export const chapterService = new ChapterService(ChapterModel);