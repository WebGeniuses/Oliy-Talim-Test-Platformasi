import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from 'mongoose'
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { Role } from "../role/models";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.EMPLOYEE
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

export class Employee  extends BaseModel{
    @prop({ 
        required:true,
        trim:true,
        unique: true,
     })
    phoneNumber: string; 

    @prop({ trim: true })
    firstname: string;

    @prop({ trim: true })
    lastname: string;

    

    @prop({ required: true, trim: true })
    password: string;

    @prop({
        required: true,
        unique: true,
        type: Types.ObjectId,
        ref: CollectionNames.ROLE,
    })
    roleId: Ref<Role>;

}
export const EmployeeModel = getModelForClass(Employee);