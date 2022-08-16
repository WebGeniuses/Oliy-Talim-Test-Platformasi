import { IsEnum, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../dtoGroups.dto";
import { PagingDto } from "../../../paging.dto";

export class NewsTypeGetDto extends PagingDto{};

export class NewsTypeDto extends BaseDto {
    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsString({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name:string;
}