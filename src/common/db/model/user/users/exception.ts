import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";

export class UserResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
        return new UserResponse(ErrorCodes.USER, 'user exist!', data);
    }

    static NotFound(data: any = null) {
        return new UserResponse(ErrorCodes.USER + 1, 'user not found!', data);
    }

    static InCorrectOtp(data: any = null) {
        return new UserResponse(ErrorCodes.USER + 2, " In correct Otp ", data)
    }

    static InCorrectPassword(data: any = null) {
        return new UserResponse(ErrorCodes.USER + 3, " In correct Password", data)
    }



}
