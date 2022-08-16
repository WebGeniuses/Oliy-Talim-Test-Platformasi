import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";


export class NewsResponse extends BaseResponse {
  static NotFound(data: any = null) {
    return new NewsResponse(ErrorCodes.NEWS, 'news not found', data);
  }
  static AlreadyExists(data: any = null) {
    return new NewsResponse(ErrorCodes.NEWS + 1, 'news  already exists!', data);
  }

}
