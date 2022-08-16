import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsUrl, ValidateIf, ValidateNested } from "class-validator";
import { Alignment, ContentType, ListIndicator } from "../../../../db/model/admin/news/news.model";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";
import { TranslationDto } from "../../translation.dto";


class ContentDataDto {
    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    newLine: boolean;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsEnum(ContentType, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    type: ContentType;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    bold: boolean;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    underline: boolean;


    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    italic: boolean;

    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    strikethrough: boolean;


    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    value: string;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2
    }, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    size: number;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsEnum(Alignment, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    align: Alignment;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    sup: boolean;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    sub: boolean;


    @ValidateIf((data) => data.type == ContentType.LIST, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsArray({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ArrayMinSize(1, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @Type(() => ContentDataDto)
    items: ContentDataDto[];

    @ValidateIf((data) => data.type == ContentType.LINK, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsUrl({}, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    href: string;

    @ValidateIf((data) => data.type == ContentType.LIST, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsEnum(ListIndicator, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    listIndicator: ListIndicator;
}





class ContentDto {

    @IsOptional({
        each:true,
        groups: [DtoGroups.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsArray({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ArrayMinSize(1, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @Type(() => ContentDataDto)
    default: ContentDataDto;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsArray({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @Type(() => ContentDataDto)
    uz: ContentDataDto;


    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsArray({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @Type(() => ContentDataDto)
    ru: ContentDataDto;


    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @Type(() => ContentDataDto)
    en: ContentDataDto;
}
export class NewsDto extends BaseDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateNested({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @Type(() => TranslationDto)
    title: TranslationDto;

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    image: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateNested({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @Type(() => ContentDto)
    content: ContentDto;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    newsTypeId: string;


    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    categoryId: string;


    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    isTop: boolean;
}

export class NewsGetDto extends PagingDto {
    @IsOptional({
        groups: [DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    newsTypeId: string;

    @IsOptional({
        groups: [DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    categoryId: string;

    @IsOptional({
        groups: [DtoGroups.PAGENATION]
    })
    @IsBoolean({
        groups: [DtoGroups.PAGENATION]
    })
    isTop: boolean
    userId: string;


}