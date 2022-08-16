import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { Translation } from "../../translate/tranlate.model";
import { Category } from "../category/category.model";
import { NewsType } from "./newsType/newsType.model";

export enum  ContentType {
    TEXT = 'text',
    VIDEO = 'video',
    IMAGE = 'img',
    LIST = 'list',
    LINK = 'link'
}
export enum Alignment {
    START = 'left',
    END = 'right',
    CENTER = 'center'
}
export enum ListIndicator {
    DOT = 'dot',
    NUMBER = 'number'
}

interface SelfContaining {
    items: SelfContaining[]
}
class ContentData implements SelfContaining {
    @prop({
        default: undefined
    })
    newLine: boolean;

    @prop({
        enum: ContentType,
        type: String
    })
    type: ContentType;

    @prop({
        default: undefined
    })
    bold: boolean;

    @prop({
        default: undefined
    })
    underline: boolean;

    @prop({
        default: undefined
    })
    italic: boolean;

    @prop({
        default: undefined
    })
    strikethrough: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    value: string;

    @prop({
        default: 14
    })
    size: number;

    @prop({
        enum: Alignment,
        type: String
    })
    align: Alignment;

    @prop({
        default: undefined
    })
    sup: boolean;

    @prop({
        default: undefined
    })
    sub: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    href: string;

    @prop({
        default: undefined
    })
    items: any[];

    @prop({
        default: undefined,
        type: String,
        enum: ListIndicator
    })
    listIndicator: ListIndicator
}

class Content {
    @prop({
        required: true,
        type: () => [ContentData]
    })
    default!: ContentData[];

    @prop({
        default: undefined,
        type: () => [ContentData]
    })
    uz?: ContentData[];

    @prop({
        default: undefined,
        type: () => [ContentData]
    })
    ru?: ContentData[];

    @prop({
        default: undefined,
        type: () => [ContentData]
    })
    en?: ContentData[];
}
@modelOptions({
    schemaOptions: {
        collection: CollectionNames.NEWS
    }
})

@index({
    title: 1,
    isDeleted: 1
}, {
    background: true,
    name: 'title'
})

@index({
    newsTypeId: 1,
    isDeleted: 1
}, {
    background: true,
    name: 'newsTypeId'
})


export class News extends BaseModel {
    @prop({
        required: true,
        type: () => Translation
    })
    title: Translation;

    @prop({
        required: true,
        trim: true
    })
    image: string;

    @prop({
        required: true,
        type: () => Content
    })
    content: Content;

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.NEWS_TYPES
    })
    newsTypeId: Ref<NewsType>;

    @prop({
        required:true,
        type:Types.ObjectId,
        ref: CollectionNames.CATEGORY
    })
    categoryId: Ref<Category>

    @prop({
        default: 0
    })
    readCount: number;

    @prop({
        default: false
    })
    isTop: boolean;

   

}

export const NewsModel = getModelForClass(News)