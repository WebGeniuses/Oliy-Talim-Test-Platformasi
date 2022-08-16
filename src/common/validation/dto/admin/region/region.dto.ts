import { IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";


export class RegionGetDto extends PagingDto{};

export class RegionDto extends BaseDto {
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name: string;
}