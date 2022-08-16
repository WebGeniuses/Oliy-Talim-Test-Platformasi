import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { model } from "mongoose";
import { CollectionNames } from "../../../../../constants/collections";
import { BaseModel } from "../../../base.model";
import { Translation } from "../../../translate/tranlate.model";




@modelOptions({
    schemaOptions:{
        collection: CollectionNames.NEWS_TYPES
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

export class NewsType extends BaseModel{
    @prop({
        required:true
    })
    name:string;
}

export const NewsTypeModel = getModelForClass(NewsType);