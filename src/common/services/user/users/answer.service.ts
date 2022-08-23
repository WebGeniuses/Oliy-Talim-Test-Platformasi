import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { cron } from "node-cron";
import { SetAnswer, SetAnswerModel } from "../../../db/model/user/test/answers/model";
import { testService } from "../../Admin/class/subject/chapter/thema/test/test.service";
import { CommonServices } from "../../common.service";


class AnswerService extends CommonServices<SetAnswer>{
    constructor(model: ModelType<SetAnswer>) {
        super(model);
    }


    public async create(data) {
        try {
            return await super.create(data);
        } catch (e) {
            return e
        }
    }


    public async getByQuestionId(data) {
        try {
            const { userId, questionId, testId, startedAt } = data;
            const $match = {
                $match: {
                    userId: userId,
                    questionId: questionId,
                    testId: testId,
                    createdAt: { $gte: (startedAt) },
                    isDeleted: false
                }
            }
            const $pipeline = [$match]

            return await this.aggregate($pipeline);
        } catch (error) {
            throw error
        }
    }

    public async checkTheTime(data, startedAt) {
        try {
            const test = await testService.getById(data.testId)
            console.log("burab;ajs : ", test)
            const duration = test.duration;
            // const time = new Date(startedAt.getTime() + 1000 * 60 * (duration));
            // const nowTime = new Date();


            let Cron = cron.schedule("* * * * * *", () => {
                // function date() {
                    var date1 = new Date(startedAt);
                    var date2 = new Date();
            
                    const time = new Date(date1.getTime() + 1000 * 60 * (duration))
            
                    const dif = time.getTime() - date2.getTime()
                    if (dif <= 0 ) {
                        console.log("time is finished!!!!")
                        
                        Cron.stop();
                        return false
                    }
                    console.log("vaqt : ", dif / (1000))
                    return true;
                })
                // date()
            // });
        } catch (e) {
            throw e;
        }
    }



}

export const answerService = new AnswerService(SetAnswerModel);