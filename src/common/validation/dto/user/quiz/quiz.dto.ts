import { Transform } from "class-transformer";
import { IsDateString, IsEnum, IsMongoId, IsNumber, IsOptional, IsPositive } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";
import { TestStatus } from "../../../../db/model/user/test/quiz/model";

export class QuizDtoGroup extends DtoGroups {
    static START = "start";
    static END = "end";
    static CHECK_ASNWER = "checkanswer";
    static STATISTICS = "statistics";
}

export class QuizGetDto extends PagingDto { }

export class QuizPagingDto extends PagingDto {
    @IsOptional({
        groups: [QuizDtoGroup.PAGENATION]
    })
    @IsMongoId({
        groups: [QuizDtoGroup.PAGENATION]
    })
    userId: string

    @IsOptional({
        groups: [QuizDtoGroup.PAGENATION]
    })
    @IsMongoId({
        groups: [QuizDtoGroup.PAGENATION]
    })
    testId: string
}

export class QuizDto extends BaseDto {
    
    @IsOptional({
        groups: [QuizDtoGroup.START, QuizDtoGroup.END],
    })
    @IsMongoId({
        groups: [QuizDtoGroup.START, QuizDtoGroup.CHECK_ASNWER]
    })
    userId: string

    @IsMongoId({
        groups: [QuizDtoGroup.START, QuizDtoGroup.STATISTICS, QuizDtoGroup.CHECK_ASNWER, QuizDtoGroup.END]
    })
    testId: string

    @IsOptional({
        groups: [QuizDtoGroup.START, QuizDtoGroup.END],
    })
    @IsDateString(
        {
            strict: false,
        },
        {
            groups: [QuizDtoGroup.START],
        },
    )
    startedAt: Date

    @IsOptional({
        groups: [QuizDtoGroup.START, QuizDtoGroup.END],
    })
    @IsDateString(
        {
            strict: false,
        },
        {
            groups: [QuizDtoGroup.END],
        },
    )
    finishedAt: Date

    @IsOptional({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE, QuizDtoGroup.START]
    })
    @Transform(({ value }) => Number(value))
    @IsNumber(
        {
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 0,
        },
        {
            groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE, QuizDtoGroup.START],
        },
    )
    @IsPositive({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE ,QuizDtoGroup.START]
    })
    questionCount: number

    @IsOptional({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    @Transform(({ value }) => Number(value))
    @IsNumber(
        {
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 0,
        },
        {
            groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE],
        },
    )
    correctAnswersCount: number

    @IsOptional({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    @Transform(({ value }) => Number(value))
    @IsNumber(
        {
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 0,
        },
        {
            groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE],
        },
    )
    percent: number

    @IsOptional({
        groups: [QuizDtoGroup.START, QuizDtoGroup.UPDATE]
    })
    @IsEnum(TestStatus, {
        groups: [QuizDtoGroup.START, QuizDtoGroup.UPDATE]
    })
    status: TestStatus
}

