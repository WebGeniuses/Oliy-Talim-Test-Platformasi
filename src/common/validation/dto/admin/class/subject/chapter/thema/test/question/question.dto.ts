import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsMongoId, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../../../../../dtoGroups.dto";
import { PagingDto } from "../../../../../../../paging.dto";



class QuestionDto {

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    title: any;


    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    image: string;

}

class AnswarDto extends QuestionDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    isCorrect: boolean;
}


export class TestQuestionDto extends BaseDto {
    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @ValidateNested({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE],
    })
    @Type(() => QuestionDto)
    question: QuestionDto;

    @IsArray({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @ValidateNested({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE],
        each: true
    })
    @Type(() => AnswarDto)
    answers: AnswarDto[];

    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testId: string;
}

export class QuestionGetDto extends PagingDto {
    @IsOptional({
        groups: [DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    classId: string;

    @IsOptional({
        groups: [DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    subjectId: string;

    @IsOptional({
        groups: [DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    chapterId: string;

    @IsOptional({
        groups: [DtoGroups.PAGENATION]
    })
    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    themaId: string;

    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    testId: string;
}