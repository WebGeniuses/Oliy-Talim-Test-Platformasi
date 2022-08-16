import { ErrorCodes } from "../../../../constants/error.coders";
import { BaseResponse } from "../../../../reporter/base.response";

export class EmployeeResponse extends BaseResponse {
    static AllreadyExist(data: any = null) {
      return new EmployeeResponse(ErrorCodes.EMPLOYEE, 'Employee exist!', data);
    }
  
    static NotFound(data: any = null) {
      return new EmployeeResponse(ErrorCodes.EMPLOYEE + 1, 'Employee not found!', data);
    }  
    
    static NotEnoughPermission(data: any = null) {
      return new EmployeeResponse(ErrorCodes.EMPLOYEE + 2, 'Not enough permissions to access!', data);
    }
  
    static InvalidPassword(data: any = null) {
      return new EmployeeResponse(ErrorCodes.EMPLOYEE + 3, 'Invalid password!', data);
    }

    static InvalidToken(data: any = null) {
      return new EmployeeResponse(ErrorCodes.EMPLOYEE + 4, "Invalid Token!", data);
    }
  }
  