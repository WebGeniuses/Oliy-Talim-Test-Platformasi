import { ErrorCodes } from "../../../../../constants/error.coders";
import { BaseResponse } from "../../../../../reporter/base.response";

export class SubjectResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new SubjectResponse(ErrorCodes.SUBJECT, 'subject exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new SubjectResponse(ErrorCodes.SUBJECT + 1, 'subject not found!', data);
    }  
    
  }
  