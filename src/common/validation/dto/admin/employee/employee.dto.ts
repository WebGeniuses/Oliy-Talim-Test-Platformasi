import { IsMongoId, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";

export class EmployeeDtoGroups extends DtoGroups {}

export class EmployeeGetDto extends PagingDto {}

export class EmployeeDto extends BaseDto {
    @IsOptional({
        groups: [EmployeeDtoGroups.CREATE, EmployeeDtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            EmployeeDtoGroups.CREATE, 
            EmployeeDtoGroups.UPDATE
        ]
    })
    firstname: string;

    @IsOptional({
        groups: [EmployeeDtoGroups.CREATE, EmployeeDtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            EmployeeDtoGroups.CREATE, 
            EmployeeDtoGroups.UPDATE
        ]
    })
    lastname: string;

    @IsOptional({
        groups: [EmployeeDtoGroups.UPDATE, EmployeeDtoGroups.GET_BY_ID]
    })
    @IsString({
        groups: [
            EmployeeDtoGroups.CREATE, 
            EmployeeDtoGroups.UPDATE,
            EmployeeDtoGroups.LOGIN,
            EmployeeDtoGroups.GET
        ]
    })
    phoneNumber: string;

    @IsOptional({
        groups: [ EmployeeDtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            EmployeeDtoGroups.CREATE, 
            EmployeeDtoGroups.UPDATE,
            EmployeeDtoGroups.LOGIN
        ]
    })
    @MinLength(4, {
        groups: [
            EmployeeDtoGroups.CREATE, 
            EmployeeDtoGroups.UPDATE,
            EmployeeDtoGroups.LOGIN
        ]
    })
    password: string;

    @IsOptional({groups: [EmployeeDtoGroups.UPDATE]})
    @IsMongoId({
        groups: [EmployeeDtoGroups.CREATE, EmployeeDtoGroups.UPDATE]
    })
    roleId: string;

}