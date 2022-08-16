import { ErrorCodes } from "../constants/error.coders";


export class BaseResponse {
    constructor(
        public code: number,
        public message: string,
        public data:any,
        public success: boolean = false,
        public statusCode : number = 400,
        public time = new Date()
    ){}

    public static UnknowenError(data?:any){
        return new BaseResponse(ErrorCodes.BASE,'Unknowen Error!', data)
    }

    public static ValidationError(data?:any){
        return new BaseResponse(ErrorCodes.BASE + 1,'Validation Error!', data)
    }
    public static Success(data?:any){
        return new BaseResponse(0,' ok ', data, true,200)
    }
    public static UnAuthorizationError(data?:any){
        return new BaseResponse(401,'Session expired!', data, false, 401)
    }
    public static notFound(data?:any){
        return new BaseResponse(404,'Not Found !', data, false , 404)
    }
    public static PositionError(data?:any){
        return new BaseResponse(400,'Pasition Error!', data)
    }
}