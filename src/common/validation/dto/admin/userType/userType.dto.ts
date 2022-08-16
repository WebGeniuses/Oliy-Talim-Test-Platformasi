import { IsNumber, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";


export class UserTypeGetDto extends PagingDto{};

export class UserTypeDto extends BaseDto {
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    type: string;
}