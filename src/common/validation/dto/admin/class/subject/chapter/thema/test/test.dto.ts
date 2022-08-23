import { IsMongoId, IsNotEmptyObject, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../../../../dtoGroups.dto";
import { PagingDto } from "../../../../../../paging.dto";


export class TestDto extends BaseDto {
    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsString({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name:string;

    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    classId: string;

    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    subjectId: string;

    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    chapterId: string;

    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    themaId: string;

    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    categoryId: string;


    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsNumber({
        allowInfinity:false,
        allowNaN:false,
    },{
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testCount: number;
    
    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsNumber({
        allowInfinity:false,
        allowNaN:false,
    },{
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    duration: number;

  
}

export class TestGetDto extends PagingDto {

    @IsOptional({
        groups:[DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups:[DtoGroups.PAGENATION]
    })
    subjectId: string;

    @IsOptional({
        groups:[DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups:[DtoGroups.PAGENATION]
    })
    chapterId: string;

    @IsOptional({
        groups:[DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups:[DtoGroups.PAGENATION]
    })
    themaId: string;
    @IsOptional({
        groups:[DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups:[DtoGroups.PAGENATION]
    })
    categoryId: string;
}