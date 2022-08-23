import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { modelNames, Types } from "mongoose";
import { CollectionNames } from "../../../../../constants/collections";
import { Test } from "../../../admin/class/subject/chapter/thema/test/model";
import { BaseModel } from "../../../base.model";
import { User } from "../../users/user.model";






export enum TestStatus {
    PANDING = "panding",
    STARTED = "started",
    FINISHED = 'finished',
};

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.QUIZ
    }
})

export class Quiz extends BaseModel {
    @prop({
        ref: CollectionNames.USERS,
        type: Types.ObjectId
    })
    userId: Ref<User>;

    @prop({
        ref: CollectionNames.TESTS,
        type: Types.ObjectId
    })
    testId: Ref<Test>;

    @prop({
        default: undefined
    })
    startedAt: Date;

    @prop({
        default: undefined
    })
    finishedAt: Date;

    @prop({})
    questionCount: number;

    @prop({
        default: 0
    })
    correctAnswersCount: number;

    @prop({
        default: 0
    })
    percent: number;


    @prop({
        default: TestStatus.PANDING,
        type:String,
        enum: TestStatus
    })
    status: TestStatus;
}

export const  QuizModel = getModelForClass(Quiz)