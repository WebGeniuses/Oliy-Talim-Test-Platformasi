import { IsOptional, IsMongoId, IsBoolean, IsString, ValidateIf } from 'class-validator';
import { BaseDto, DtoGroups } from '../../../dtoGroups.dto';
import { PagingDto } from '../../paging.dto';

export class RoleDtoGroup extends DtoGroups { }

export class RoleGetDto extends PagingDto { }

export class RoleDto extends BaseDto{
  @IsString({
    groups: [RoleDtoGroup.UPDATE, RoleDtoGroup.CREATE],
  })
  name: string; 

  
  //news 
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  news: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  newsCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  newsUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  newsDelete: boolean;

  //sobject 
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  sobject: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  sobjectCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  sobjectUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  sobjectDelete: boolean;

  /** *********************************************** */

  //category
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  category: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryDelete: boolean;


  /** ******************************* */


  

  /** ******************************* */

  //----------------------- USERS ------------------------
  // students
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  student: boolean;

  //   @IsBoolean({
  //     groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  //   })
  //   @IsOptional({
  //     groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  //   })
  //   studentCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  studentUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  studentDelete: boolean;


  // teachers
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  teacher: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  teacherCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  teacherUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  teacherDelete: boolean;

  /** ******************************* */

  //role
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  role: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleDelete: boolean;

  /** ******************************* */

  //employee
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employee: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeDelete: boolean;

  /** ******************************* */

  //statistics
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  statistics: boolean;

}
