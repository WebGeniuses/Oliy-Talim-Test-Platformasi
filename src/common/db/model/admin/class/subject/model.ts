import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../../constants/collections";
import { BaseModel } from "../../../base.model";
import { Class } from "../model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.SUBJECT
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

export class Subject extends BaseModel{
    @prop({
        required: true,
    })
    name: string;

    @prop({
        ref: CollectionNames.CLASS,
        type: Types.ObjectId,
        required: true
    })
    classId: Ref<Class>;
}

export const SubjectModel = getModelForClass(Subject);