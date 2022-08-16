import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";

export class CategoryResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new CategoryResponse(ErrorCodes.CATEGORY, 'cateegory exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new CategoryResponse(ErrorCodes.CATEGORY + 1, 'category not found!', data);
    }  
    
  }
  