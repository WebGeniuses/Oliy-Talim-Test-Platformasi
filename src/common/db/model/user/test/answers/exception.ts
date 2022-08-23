import { ErrorCodes } from "../../../../../constants/error.coders";
import { BaseResponse } from "../../../../../reporter/base.response";



export class AnswersResponse extends BaseResponse {
  static NotFound(data: any = null) {
    return new AnswersResponse(ErrorCodes.ANSWER, 'answers not found', data);
  }
  static AlreadyExists(data: any = null) {
    return new AnswersResponse(ErrorCodes.ANSWER + 1, 'answers  already exists!', data);
  }
  static TimeFinished(data: any = null) {
    return new AnswersResponse(ErrorCodes.ANSWER + 2, 'time is finished!', data);
  }

}
