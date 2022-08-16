import { IsString} from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";


export class ClassGetDto extends PagingDto{};

export class ClassDto extends BaseDto {
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name: string;
}