import { BaseResponse } from "../../common/reporter/base.response";
import { userService } from "../../common/services/user/users/user.service";
import { jwt } from "../../common/utils/jwt";


export async function userToken(req, res, next) {
    try {
        const {phoneNumber} = jwt.verify(req.headers.token);
        console.log(phoneNumber)
        const user = await userService.findOne({phoneNumber:phoneNumber});
        console.log(user)
        req.userId = user._id;
        return next();
    } catch (e) {
        return next(BaseResponse.UnAuthorizationError(e));
    }
}