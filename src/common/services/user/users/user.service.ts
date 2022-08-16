import { ModelType } from "@typegoose/typegoose/lib/types";
import { UserResponse } from "../../../db/model/user/users/exception";
import { User, UserModel } from "../../../db/model/user/users/user.model";
import sha256 from "sha256";
import { CommonServices } from "../../common.service";



class UserService extends CommonServices<User>{
    constructor(model: ModelType<User>) {
        super(model);
    }

    public async findByIdError(id) {
        try {
            let user = await this.findById(id);
            if (!user) throw UserResponse.notFound(id);
            return user;
        } catch (e) {
            return e;
        }
    }

    public async register(data) {
        try {
            data.password = sha256(data.password);
            const otp =  Math.random().toString().substring(2, 6);
            data.otp = otp;
            return await super.create(data);
        } catch (e) {
            if (e.code == 11000) throw UserResponse.AllreadyExist(Object.keys(e.keyPattern))
            return e;
        }
    }
}

export const userService = new UserService(UserModel)