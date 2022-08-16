import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";



@modelOptions({
    schemaOptions: {
        collection: CollectionNames.CLASS
    }
})

@index({
    name: 1
},
    {
        background: true,
        name: 'className',
        unique: true,
        partialFilterExpression: {
            isDeleted: {
                $eq: false,
            }
        }
})

export class Class extends BaseModel{
    @prop({
        required: true,
    })
    name: string;
}

export const ClassModel = getModelForClass(Class);