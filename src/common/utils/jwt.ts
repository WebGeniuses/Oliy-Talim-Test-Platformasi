
import jsonWebToken from "jsonwebtoken";
import { ENV } from "../config/config";

export const jwt = {
    sign: (payload: any) => jsonWebToken.sign(payload, ENV.TOKEN_KEY, ENV.TOKEN_TIME),
    verify: (token: string) => jsonWebToken.verify(token, ENV.TOKEN_KEY)
}