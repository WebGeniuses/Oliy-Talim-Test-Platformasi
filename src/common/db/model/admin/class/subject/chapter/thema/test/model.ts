import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../../../../../constants/collections";
import { BaseModel } from "../../../../../../base.model";
import { Category } from "../../../../../category/category.model";
import { Class } from "../../../../model";
import { Subject } from "../../../model";
import { Chapter } from "../../model";
import { Thema } from "../model";




@modelOptions({
    schemaOptions: {
        collection: CollectionNames.TESTS
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

export class Test extends BaseModel {
    @prop({
        required: true,
    })
    name: string;

    @prop({
        default: undefined,
        trim: true,
        ref: CollectionNames.CLASS
    })
    classId: Ref<Class>;

    @prop({
        required:true,
        trim: true,
        ref: CollectionNames.SUBJECT
    })
    subjectId: Ref<Subject>;

    @prop({
        default: undefined,
        trim: true,
        ref: CollectionNames.CHAPTER,
    })
    chapterId?: Ref<Chapter>;

    @prop({
        default: undefined,
        trim: true,
        ref: CollectionNames.THEMA,
    })
    themaId?: Ref<Thema>;

    @prop({
        default: undefined,
        trim: true,
        ref: CollectionNames.CATEGORY,
    })
    categoryId?: Ref<Category>;

    @prop({
        required: true,
        default: 0
    })
    testCount: number;



    @prop({
        required: true,
    })
    duration: number;
}

export const TestModel = getModelForClass(Test);
