import { Transform, Type } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";

export class StatisticsGroups extends DtoGroups {}

export class StatisticsDto extends BaseDto {
    @Transform(({ value }) => String(value), {groups: [StatisticsGroups.GET]})
    @IsNotEmpty({groups: [StatisticsGroups.GET]})
    @Type(() => Date)
    @IsDate({groups: [StatisticsGroups.GET]})
    from: string;

    @Transform(({ value }) => String(value), {groups: [StatisticsGroups.GET]})
    @IsNotEmpty({groups: [StatisticsGroups.GET]})
    @Type(() => Date)
    @IsDate({groups: [StatisticsGroups.GET]})
    to: string;

    @IsOptional({
        groups: [StatisticsGroups.GET],
    })
    @IsMongoId({groups: [StatisticsGroups.GET]})
    courseId: string;

    @Transform(({ value }) => String(value), {groups: [StatisticsGroups.STEP]})
    @IsNotEmpty({groups: [StatisticsGroups.STEP]})
    @IsNumberString({groups: [StatisticsGroups.STEP]})
    step: string;
}