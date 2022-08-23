import { IsMongoId, IsOptional } from "class-validator";
import { BaseModel } from "../../../../db/model/base.model";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";


export class SetAnswerDto extends BaseDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    userId: string

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testId: string

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    questionId: string

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    answerId: string


}