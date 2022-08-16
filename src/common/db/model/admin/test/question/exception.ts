import { ErrorCodes } from "../../../../../constants/error.coders";
import { BaseResponse } from "../../../../../reporter/base.response";


export class QuestionResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new QuestionResponse(ErrorCodes.QUESTION, 'question exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new QuestionResponse(ErrorCodes.QUESTION + 1, 'question not found!', data);
    }  
    
  }
  