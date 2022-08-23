import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { getModeForFileReference } from "typescript";
import { CollectionNames } from "../../../../../constants/collections";
import { Test } from "../../../admin/class/subject/chapter/thema/test/model";
import { TestQuestion } from "../../../admin/class/subject/chapter/thema/test/question/model";
import { BaseModel } from "../../../base.model";
import { User } from "../../users/user.model";


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.SET_ANSWERS
    }
})

export class SetAnswer extends BaseModel {
    @prop({
        require: true,
        trim: true,
        ref: CollectionNames.USER
    })
    userId: Ref<User>;

    @prop({
        required: true,
        trim: true,
        ref:CollectionNames.TESTS
    })
    testId: Ref<Test>;

    @prop({
        required: true,
        trim: true,
        ref:CollectionNames.QUESTION
    })
    questionId: Ref<TestQuestion>;
    
    @prop({
        required: true,
        trim: true,
        ref:CollectionNames.QUESTION
    })
    answerId: Ref<TestQuestion>;

    
}


export const SetAnswerModel = getModelForClass(SetAnswer)