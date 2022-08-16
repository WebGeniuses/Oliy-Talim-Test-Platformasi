import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { Subject } from "../subject/subject.model";



@modelOptions({
    schemaOptions: {
        collection: CollectionNames.CHAPTER
    }
})

@index({
    chapterName: 1
},
    {
        background: true,
        name: 'chapterName',
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
    chapterName: string;

    @prop({
        ref: CollectionNames.SUBJECT,
        required: true,
        type: Types.ObjectId
    })
    subjectId: Ref<Subject>;
}

export const ChapterModel = getModelForClass(Chapter);