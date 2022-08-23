import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../../../../constants/collections";
import { BaseModel } from "../../../../../base.model";
import { Chapter } from "../model";



@modelOptions({
    schemaOptions: {
        collection: CollectionNames.THEMA
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

export class Thema extends BaseModel{
    @prop({
        required: true,
        trim: true
    })
    name: string;

    @prop({
        required: true,
        ref: CollectionNames.CHAPTER,
        trim: true
    })
    chapterId: Ref<Chapter>
}

export const ThemaModel = getModelForClass(Thema);