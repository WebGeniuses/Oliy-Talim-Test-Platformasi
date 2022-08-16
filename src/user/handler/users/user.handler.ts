import { UserResponse } from "../../../common/db/model/user/users/exception";
import { userService } from "../../../common/services/user/users/user.service";
import { jwt } from "../../../common/utils/jwt";
import { UserDto } from "../../../common/validation/dto/user/user.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";
import sha256 from "sha256"


export async function registerHandler(req, res, next) {
    try {
        const data = await validateIt(req.body,  UserDto, DtoGroups.REGISTER);
        const user = await userService.register(data);
        const resault = {
            _id: user._id,
            otp: user.otp
        }
        console.log("resault:  "  ,resault)
        return res.send(UserResponse.Success(resault))
    } catch (e) {
        return next(e);
    }
}

export async function loginHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, DtoGroups.LOGIN);
        const user = await userService.findOne({phoneNumber:data.phoneNumber});
        if(!user) throw UserResponse.NotFound(data);
        if(user.password !== sha256(data.password))  throw UserResponse.InCorrectPassword(data.password);
        const token = jwt.sign({ phoneNumber: user.phoneNumber });
        return res.send(UserResponse.Success({
            token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                phoneNumber: user.phoneNumber
            }
        }))
    } catch (e) {
        return next(e);
    }
}

export async function verifyHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, UserDto, DtoGroups.VERIFY);
        const user = await userService.findOne({phoneNumber: data.phoneNumber});
        if(!user) throw UserResponse.NotFound(data.phoneNumber);
        if(user.otp != data.otp)  throw UserResponse.InCorrectOtp(data.otp);
        const token = jwt.sign({ phoneNumber: user.phoneNumber });
        return res.send(UserResponse.Success({
            token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                phoneNumber: user.phoneNumber
            }
        }))
    } catch (e) {
        return next(e);
    }
}

export async function updateUserHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, DtoGroups.UPDATE);
        const id = req.userId;
        const user = await userService.findById(id);
        if(!user) throw UserResponse.NotFound(id);
        if(data.password){
            data.password = sha256(data.password);
        }
        const updateUser = await userService.updateOne(id, data);
        const response = await userService.findById(updateUser._id);
        return res.send(UserResponse.Success(response)); 
    } catch (e) {
        return next(e);
    }
}


export async function deleteUserHandler(req, res, next) {
    try {
        const id = req.userId;
        const user = await userService.findById(id);
        if(!user) throw UserResponse.NotFound(id);
        const deleteUser = await userService.deleteOne(id)
        return res.send(UserResponse.Success(deleteUser)); 
    } catch (e) {
        return next(e);
    }
}

