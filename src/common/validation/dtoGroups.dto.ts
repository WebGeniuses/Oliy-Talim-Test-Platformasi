import { IsMongoId, IsOptional } from "class-validator";

export class DtoGroups {

  static CREATE = "create";
  static GET = "get";
  static UPDATE = "update";
  static DELETE = "delete";

  static LOGIN = "login";
  static REGISTER = "register";
  static VERIFY = "verify";
  
  static GET_BY_ID = "getById";
  static PAGENATION = "pagination";
  static POSITION = "position";
  static SET_STATUS = 'status';
  static STEP = "step";

}

export class BaseDto {
  @IsOptional({ groups: [DtoGroups.PAGENATION, DtoGroups.UPDATE] })
  @IsMongoId({
    groups: [
      DtoGroups.UPDATE,
      DtoGroups.DELETE,
      DtoGroups.GET_BY_ID,
      DtoGroups.PAGENATION,
      DtoGroups.POSITION
    ],
  })
  _id?: string;

  @IsOptional({ groups: [DtoGroups.CREATE, DtoGroups.UPDATE] })
  @IsMongoId({ groups: [DtoGroups.CREATE] })
  createdBy?: string;

  @IsOptional({ groups: [DtoGroups.UPDATE, DtoGroups.UPDATE] })
  @IsMongoId({ groups: [DtoGroups.UPDATE] })
  updatedBy?: string;

  @IsOptional({ groups: [DtoGroups.DELETE, DtoGroups.UPDATE] })
  @IsMongoId({ groups: [DtoGroups.DELETE] })
  deletedBy?: string;

  isDeleted?: boolean;
}

