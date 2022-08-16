import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { TransformStreamDefaultController } from "stream/web";
import { CollectionNames } from "../../../../constants/collections";
import { Region } from "../../admin/region/region.model";
import { UserType } from "../../admin/userType/userType.model";
import { BaseModel } from "../../base.model";

export enum Gender {
    MALE = 'male',
    FEMALE = "female"
}

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.USER
    }
})


@index(
    { phoneNumber: 1 },
    {

        unique: true,
        background: true,
        name: "phoneNumber",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class User extends BaseModel {
    @prop({
        required: true,
        trim: true,
        unique: true,
    })
    phoneNumber: string;

    @prop({ trim: true })
    firstname: string;

    @prop({ trim: true })
    lastname: string;

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.REGION,
    })
    region: Ref<Region>;

    @prop({ trim: true })
    age: number;

    @prop({
        enum: Gender,
        type: String,
        default: Gender.MALE,
        required: true
    })
    gender!: Gender;

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.USER_TYPE
    })
    userTypeId: Ref<UserType>;

    @prop({
        default: undefined,
        trim: true
    })
    image: string;


    @prop({
        trim: true,
        required:true
    })
    password: string;


    @prop({
        trim: true
    })
    otp:string;

}
export const UserModel = getModelForClass(User);