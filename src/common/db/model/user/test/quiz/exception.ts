import { ErrorCodes } from "../../../../../constants/error.coders";
import { BaseResponse } from "../../../../../reporter/base.response";



export class QuizResponse extends BaseResponse {
  static NotFound(data: any = null) {
    return new QuizResponse(ErrorCodes.QUIZ, 'quiz not found', data);
  }
  static Alreadystarted(data: any = null) {
    return new QuizResponse(ErrorCodes.QUIZ + 1, 'test already started!', data);
  }

  static HaveStartedTest(data: any = null) {
    return new QuizResponse(ErrorCodes.QUIZ + 2, "you have a started test", data)
}

static TestUnknowenError(data: any = null) {
  return new QuizResponse(ErrorCodes.QUIZ + 4, "test started or already finished", data)
}

}
