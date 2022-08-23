import { IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../../dtoGroups.dto";
import { PagingDto } from "../../../../paging.dto";

export class ChapterGetDto extends PagingDto{
    @IsMongoId({
        groups:[DtoGroups.PAGENATION]
    })
    subjectId: string;
};

export class ChapterDto extends BaseDto {
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
    subjectId: string;
}