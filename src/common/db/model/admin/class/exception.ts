import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";

export class ClassResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new ClassResponse(ErrorCodes.CLASS, 'class exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new ClassResponse(ErrorCodes.CLASS + 1, 'class not found!', data);
    }  
    
  }
  