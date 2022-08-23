import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { CollectionNames } from "../../../constants/collections";
import { QuizResponse } from "../../../db/model/user/test/quiz/exception";
import { Quiz, QuizModel, TestStatus } from "../../../db/model/user/test/quiz/model";
import { QuizPagingDto } from "../../../validation/dto/user/quiz/quiz.dto";
import { CommonServices } from "../../common.service";
import { answerService } from "./answer.service";

class QuizService extends CommonServices<Quiz>{
    constructor(model: ModelType<Quiz>) {
        super(model);
    }

    public async create(data) {
        try {
            return await super.create(data);
        } catch (e) {
            return e;
        }
    }

    public async findUserAndTest(data) {

        const $sort = {
            $sort: {
                createdAt: -1
            }
        }

        const $match = {
            $match: {
                userId: new Types.ObjectId(data.userId),
                testId: new Types.ObjectId(data.testId),
                isDeleted: false,
                status: TestStatus.STARTED
            }
        }


        const $pipeline = [$sort, $match]
        return (await this.aggregate($pipeline));
    }

    public async getTestDonePaging<T>(data: QuizPagingDto) {
        try {
            let query = {
                isDeleted: false,
                userId: new Types.ObjectId(data.userId)
            };

            const $project = {
                $project: {
                    isDeleted: 0,
                    __v: 0
                }
            }
            const $pipeline = [$project];

            return await this.findPaging(query, data, $pipeline);
        } catch (e) {
            return e;
        }
    }

    public async getQuizByUserIdAndTestId(userId, testId) {
        const $sort = {
            $sort:{
                createdAt:-1
            }
        }

        const $match = {
            $match:{
                userId: new Types.ObjectId(userId),
                testId: new Types.ObjectId(testId),
                isDeleted: false
            }
        }

        const $lookup = {
            $lookup:{
                from: CollectionNames.TESTS,
                localField: "testId",
                foreignField: "_id",
                as: "test"
            }
        }
        const $pipeline = [
            $sort,
            $match,
            $lookup
        ]
        const resault = (await this.aggregate($pipeline)).shift();
        if (!resault) throw QuizResponse.NotFound()

        return resault;
    }

    public async checkStatus(UserId) {
        let $sort = {
            $sort: {
                createdAt: -1
            }
        };
        let $match = {
            $match: {
                userId: new Types.ObjectId(UserId),
                isDeleted: false,
                status: TestStatus.STARTED
            }
        }

        const $pipeline = [
            $sort,
            $match
        ];

        const resault = (await this.aggregate($pipeline)).shift();
        if (resault) throw QuizResponse.HaveStartedTest({ testId: resault.testId })
        return resault;

    }





    public async testResault(userId, testId, startedAt) {
        const $sort = {
            $sort: {
                createdAt: -1
            }
        }
        console.log("user:  ", userId)
        console.log("test:  ", testId)
        console.log("start:  ", startedAt)
        const $match = {
            $match: {
                userId: new Types.ObjectId(userId),
                testId: new Types.ObjectId(testId),
                isDeleted: false,
                createdAt: { $gte: (startedAt) }
            }
        }

        const $lookUpQuestion = {
            $lookup: {
                from: CollectionNames.QUESTION,
                localField: "questionId",
                foreignField: "question._id",
                as: "question"
            }
        }
        const $unwindQuestion = {
            $unwind: {
                path: "$question",
                preserveNullAndEmptyArrays: true
            }
        }

        const $project = {
            $project: {
                answerId: 1,
                "correctAnswer": {
                    $filter: {
                        input: '$question.answers',
                        as: "item",
                        cond: {
                            $and: [
                                {
                                    $eq: ["$$item.isCorrect", true]
                                }
                            ]
                        }
                    }
                }
            }
        }

        const $unwindAnswer = {
            $unwind: {
                path: "$correctAnswer",
                preserveNullAndEmptyArrays: true
            }
        }

        const $group = {
            $group: {
                _id: {
                    answer: {
                        $eq: ["$answerId", "$correctAnswer._id"]
                    }
                },
                count: { $sum: 1 }
            }
        }
        const $Match = {
            $match: {
                "_id.answer": true
            }
        }

        const $pipeline = [
            $sort,
            $match,
            $lookUpQuestion,    
            $unwindQuestion,
            $project,
            $unwindAnswer,
            $group,
            $Match
        ]

        let resault = (await answerService.aggregate($pipeline)).shift();
        console.log("quiz Service :     ", resault)
        if (!resault) {
            resault = {
                _id: {
                    answer: true
                },
                count: 0
            }
            return resault;
        }

    return resault;

    }

}


export const quizService = new QuizService(QuizModel)