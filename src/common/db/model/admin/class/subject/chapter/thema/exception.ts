import { ErrorCodes } from "../../../../../../../constants/error.coders";
import { BaseResponse } from "../../../../../../../reporter/base.response";

export class ThemaResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new ThemaResponse(ErrorCodes.THEMA, 'thema exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new ThemaResponse(ErrorCodes.THEMA + 1, 'thema not found!', data);
    }  
    
  }
  