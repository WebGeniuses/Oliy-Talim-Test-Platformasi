import { IsMongoId, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../../../dtoGroups.dto";
import { PagingDto } from "../../../../../paging.dto";


export class ThemaGetDto extends PagingDto {
    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    chapterId: string;
};


export class ThemaDto extends BaseDto {
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name: string;
    
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    chapterId: string;
}