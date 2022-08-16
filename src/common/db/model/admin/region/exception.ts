import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";

export class RegionResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new RegionResponse(ErrorCodes.REGION, 'region exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new RegionResponse(ErrorCodes.REGION + 1, 'region not found!', data);
    }  
    
  }