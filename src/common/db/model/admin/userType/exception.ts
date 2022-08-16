import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";

export class UserTypeResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new UserTypeResponse(ErrorCodes.USERTYPE, 'USER exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new UserTypeResponse(ErrorCodes.USERTYPE + 1, 'USER not found!', data);
    }  

    
  }
  