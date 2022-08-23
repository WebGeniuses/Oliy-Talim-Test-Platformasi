import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../../../../../../constants/collections";
import { BaseModel } from "../../../../../../../base.model";

import { Test } from "../model";

class Question {
    @prop({
    //    type: ()=> Translation,
    })
    title: string;

    @prop({
        // type: ()=> Translation,
    })
    image: string
}

class Answar extends Question{
    @prop({
        default:false,
    })
    isCorrect: boolean;
}




@modelOptions({
    schemaOptions: {
        collection: CollectionNames.QUESTION
    }
})

@index({
    question: 1
},
    {
        background: true,
        name: 'question',
        unique: true,
        partialFilterExpression: {
            isDeleted: {
                $eq: false,
            }
        }
    })

export class TestQuestion extends BaseModel {
    @prop({
        required: true,
        type: ()=> Question,
    })
    question: Question;

    @prop({
        required: true,
        type: ()=> [Answar],
    })
    answers: Answar[];

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.TESTS
    })
    testId: Ref<Test>;
}

export const QuestionModel = getModelForClass(TestQuestion);