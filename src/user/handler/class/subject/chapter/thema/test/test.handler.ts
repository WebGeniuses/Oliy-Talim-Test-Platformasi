import { TestResponse } from "../../../../../../../common/db/model/admin/test/exception";
import { testService } from "../../../../../../../common/services/Admin/class/subject/chapter/thema/test/test.service";
import { TestGetDto, TestDto } from "../../../../../../../common/validation/dto/admin/class/subject/chapter/thema/test/test.dto";
import { DtoGroups } from "../../../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../../../common/validation/validate";

export async function getPagingTestHandler(req, res, next) {
    try {
        
        const data = await validateIt(req.query, TestGetDto, DtoGroups.PAGENATION);
        const test = await testService.getPagingTest(data);
        const count = await testService.getCount();
        const resault = {
            data: test,
            testCount: count
        }

        return await res.send(TestResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}

export async function getByIdTestHandler(req, res, next) {
    try {
        
        const data = await validateIt(req.params, TestDto, DtoGroups.GET_BY_ID)
        const test = await testService.getByIdTest(data._id);
        if(!test) throw TestResponse.notFound(data._id);
        return res.send(TestResponse.Success(test));
    } catch (error) {
        return next(error)
    }
}