import { IsMongoId, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../dtoGroups.dto";
import { PagingDto } from "../../../paging.dto";

export class SubjectDto extends BaseDto {
   
    // @ValidateNested({
    //     groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    // })
    @IsString({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    subjectName: string;

    @IsOptional({
        groups:[DtoGroups.UPDATE,DtoGroups.DELETE]
    })
    @IsMongoId({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    classId: string ;

}


export class SubjectGetDto extends PagingDto {

    @IsMongoId({
        groups:[DtoGroups.PAGENATION]
    })
    classId: string ;

}