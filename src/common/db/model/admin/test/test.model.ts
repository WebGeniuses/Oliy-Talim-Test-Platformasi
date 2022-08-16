import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Collection } from "mongoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { Category } from "../category/category.model";
import { Chapter } from "../chapter/chapter.model";
import { Class } from "../class/class.model";
import { Subject } from "../subject/subject.model";
import { Thema } from "../thema/thema.model";



@modelOptions({
    schemaOptions: {
        collection: CollectionNames.TESTS
    }
})

@index({
    testName: 1
},
    {
        background: true,
        name: 'testName',
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
    testName: string;

    @prop({
        default: undefined,
        trim: true,
        ref: CollectionNames.CLASS
    })
    classId: Ref<Class>;

    @prop({
        default: undefined,
        trim: true,
        ref: CollectionNames.SUBJECT
    })
    subjectId?: Ref<Subject>;

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
    })
    testStart: string

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
