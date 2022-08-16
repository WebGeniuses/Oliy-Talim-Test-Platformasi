import { modelOptions, prop, index, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Employee } from "./admin/employee/models";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

@index(
  {
    isDeleted: 1,
  },
  {
    background: true,
    name: "isDeleted",
    partialFilterExpression: { isDeleted: { $eq: false } }
  }
)

export class BaseModel {
  @prop({
    type: Types.ObjectId
  })
  createdBy: Ref<Employee>;

  @prop({
    type: Types.ObjectId,
  })
  updatedBy: Ref<Employee>;

  @prop({
    type: Types.ObjectId,
  })
  deletedBy: Ref<Employee>;

  @prop({ default: false })
  isDeleted: boolean;

  @prop({ default: undefined })
  deletedAt?: Date;

  createdAt?: Date;
  updatedAt: Date;
}
