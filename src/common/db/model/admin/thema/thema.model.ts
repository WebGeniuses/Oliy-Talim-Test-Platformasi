import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { Chapter } from "../chapter/chapter.model";



@modelOptions({
    schemaOptions: {
        collection: CollectionNames.THEMA
    }
})

@index({
    themaName: 1
},
    {
        background: true,
        name: 'themaName',
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
    themaName: string;

    @prop({
        required: true,
        ref: CollectionNames.CHAPTER,
        trim: true
    })
    chapterId: Ref<Chapter>
}

export const ThemaModel = getModelForClass(Thema);