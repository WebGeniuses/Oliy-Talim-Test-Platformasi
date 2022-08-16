import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";

export class ChapterResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new ChapterResponse(ErrorCodes.CHAPTER, 'chapter exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new ChapterResponse(ErrorCodes.CHAPTER + 1, 'chapter not found!', data);
    }  
    
  }
  