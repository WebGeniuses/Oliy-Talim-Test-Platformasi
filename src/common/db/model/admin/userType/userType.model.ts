import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";

export enum DefaultUserTypes {
    PUPIL = 'pupil',
    TEACHER = 'teacher',
    PARENT = 'parent'
}


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.USER_TYPE
    }
})

export class UserType extends BaseModel{
    @prop({
        required: true,
        enum:DefaultUserTypes,
        default:undefined,
        type:String
    })
    type?: DefaultUserTypes ;
}

export const userTypeModel = getModelForClass(UserType);