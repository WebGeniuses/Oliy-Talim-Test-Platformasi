
import { ErrorCodes } from "../../../../../constants/error.coders";
import { BaseResponse } from "../../../../../reporter/base.response";


export class NewsTypeResponse extends BaseResponse {
  static NotFound(data: any = null) {
    return new NewsTypeResponse(ErrorCodes.NEWSTYPE, 'news Type not found', data);
  }
  static AlreadyExists(data: any = null) {
    return new NewsTypeResponse(ErrorCodes.NEWSTYPE+ 1, 'news Type already exists!', data);
  }
 


}
