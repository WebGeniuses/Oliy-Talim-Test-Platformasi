import { IsMongoId, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";


export class UserGetDto extends PagingDto { }

export class UserDto extends BaseDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE,
            DtoGroups.UPDATE,
            DtoGroups.REGISTER
        ]
    })
    firstname: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE,
            DtoGroups.UPDATE,
            DtoGroups.REGISTER
        ]
    })
    lastname: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.GET_BY_ID]
    })
    @IsString({
        groups: [
            DtoGroups.UPDATE,
            DtoGroups.LOGIN,
            DtoGroups.GET,
            DtoGroups.REGISTER,
            DtoGroups.VERIFY
        ]
    })
    phoneNumber: string;


    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.REGISTER,
            DtoGroups.CREATE,
            DtoGroups.UPDATE,
            DtoGroups.LOGIN
        ]
    })
    @MinLength(4, {
        groups: [
            DtoGroups.CREATE,
            DtoGroups.UPDATE,
            DtoGroups.LOGIN,
            DtoGroups.REGISTER
        ]
    })
    password: string;



    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.GET_BY_ID]
    })
    @IsString({
        groups: [
            DtoGroups.UPDATE,
        ]
    })
    image: string;



    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.GET_BY_ID]
    })
    @IsMongoId({
        groups: [
            DtoGroups.UPDATE,
            DtoGroups.REGISTER
        ]
    })
    userTypeId: string;


    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.GET_BY_ID]
    })
    @IsMongoId({
        groups: [
            DtoGroups.UPDATE,
            DtoGroups.REGISTER
        ]
    })
    region: string;


    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.GET_BY_ID]
    })
    @IsString({
        groups: [
            DtoGroups.UPDATE,
            DtoGroups.GET_BY_ID,
            DtoGroups.REGISTER
        ]
    })
    gender: string;


    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.GET_BY_ID]
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    }, {
        groups: [
            DtoGroups.UPDATE,
            DtoGroups.REGISTER
        ]
    })
    age: number;


    @IsString({
        groups:[DtoGroups.VERIFY]
    })
    otp: string;

}