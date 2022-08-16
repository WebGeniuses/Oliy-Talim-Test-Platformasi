import { IsNumber, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";


export class CategoryGetDto extends PagingDto{};

export class CategoryDto extends BaseDto {
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name: string;
}