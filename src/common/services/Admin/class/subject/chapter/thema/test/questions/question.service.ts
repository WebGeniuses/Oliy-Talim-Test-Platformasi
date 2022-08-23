import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { TestQuestion, QuestionModel } from "../../../../../../../../db/model/admin/class/subject/chapter/thema/test/question/model";
import { QuestionGetDto } from "../../../../../../../../validation/dto/admin/class/subject/chapter/thema/test/question/question.dto";
import { TestGetDto } from "../../../../../../../../validation/dto/admin/class/subject/chapter/thema/test/test.dto";
import { CommonServices } from "../../../../../../../common.service";


class QuestionService extends CommonServices<TestQuestion>{
    constructor(model: ModelType<TestQuestion>){
        super(model);
    }

    public async createQuestion(data){
        try {
            console.log("ok 2");
            return await super.create(data);
        } catch (e) {
            return e;
        }
    }

    public async GetPagingQuestions<T>(data: QuestionGetDto){
        try {
            let query = {
                isDeleted:false,
                testId: new Types.ObjectId(data.testId)
            }

            const $project = {
                $project: {
                    isDeleted:0,
                    _id:0
                }
            }

            const $pipeline = [$project];
            return await this.findPaging(query, data, $pipeline);
        } catch (e) {
            return e;
        }
    }
}

export const questionService = new QuestionService(QuestionModel);