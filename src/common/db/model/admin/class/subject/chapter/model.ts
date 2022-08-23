import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../../../constants/collections";
import { BaseModel } from "../../../../base.model";
import { Subject } from "../model";



@modelOptions({
    schemaOptions: {
        collection: CollectionNames.CHAPTER
    }
})

@index({
    name: 1
},
    {
        background: true,
        name: 'name',
        unique: true,
        partialFilterExpression: {
            isDeleted: {
                $eq: false,
            }
        }
})

export class Chapter extends BaseModel{
    @prop({
        required: true,
    })
    name: string;

    @prop({
        ref: CollectionNames.SUBJECT,
        required: true,
        type: Types.ObjectId
    })
    subjectId: Ref<Subject>;
}

export const ChapterModel = getModelForClass(Chapter);