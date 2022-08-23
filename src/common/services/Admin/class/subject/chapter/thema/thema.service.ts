import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Thema, ThemaModel } from "../../../../../../db/model/admin/class/subject/chapter/thema/model";
import { ThemaGetDto } from "../../../../../../validation/dto/admin/class/subject/chapter/thema/thema.dto";
import { CommonServices } from "../../../../../common.service";


class ThemaService extends CommonServices<Thema>{
    constructor(model: ModelType<Thema>){
        super(model);
    }

    public async  createThema(data){
        try {
            return await super.create(data);
        } catch (e) {
            return e;
        }
    }


    public async getpagingThema<T>(data: ThemaGetDto){
        try {
            let query = {
                isDeleted:false,
                chapterId: new Types.ObjectId(data.chapterId)
            };

            const $project = {
                $project: {
                    _id:1,
                    themaName:1,
                    chapterId:1,
                }
            }
            const $pipeline = [$project]
            return await this.findPaging(query, data, $pipeline)
        } catch (e) {
            return e;
        }
    }
}

export const themaService = new ThemaService(ThemaModel);