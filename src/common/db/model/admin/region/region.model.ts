import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";



@modelOptions({
    schemaOptions: {
        collection: CollectionNames.REGION
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

export class Region extends BaseModel{
    @prop({
        required: true,
    })
    name: string;
}

export const RegionModel = getModelForClass(Region);