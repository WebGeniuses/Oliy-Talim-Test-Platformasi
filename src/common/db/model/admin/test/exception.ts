import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";

export class TestResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new TestResponse(ErrorCodes.TEST, 'test exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new TestResponse(ErrorCodes.TEST + 1, 'test not found!', data);
    }  
    
  }
  