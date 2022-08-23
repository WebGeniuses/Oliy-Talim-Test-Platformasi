import { Roles } from "../../../../../../../common/constants/roles";
import { TestResponse } from "../../../../../../../common/db/model/admin/class/subject/chapter/thema/test/exception";
import { testService } from "../../../../../../../common/services/Admin/class/subject/chapter/thema/test/test.service";
import { TestDto, TestGetDto } from "../../../../../../../common/validation/dto/admin/class/subject/chapter/thema/test/test.dto";
import { DtoGroups } from "../../../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../../../common/validation/validate";


export async function createTesthandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.TEST_CREATE);
        const data = await validateIt(req.body, TestDto, DtoGroups.CREATE);
        const test = await testService.createTest(data);
        return res.send(TestResponse.Success(test));
    } catch (e) {
        return next(e);
    }
} 

export async function getPagingTestHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.TEST);
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
        // await roleService.hasAccess(req.roleId, Roles.TEST)
        const data = await validateIt(req.params, TestDto, DtoGroups.GET_BY_ID)
        const test = await testService.getByIdTest(data._id);
        if(!test) throw TestResponse.notFound(data._id);
        return res.send(TestResponse.Success(test));
    } catch (error) {
        return next(error)
    }
}


export async function updateTestHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.TEST_UPDATE);
        const data = await validateIt(req.body, TestDto, DtoGroups.UPDATE);
        const id = data._id;
        const test = await testService.findById(id);
        console.log(test);
        if (!test) throw TestResponse.notFound(id);
        const updateTest = await testService.updateOne(id, data);
        console.log("Update  $$$$$   ", updateTest._id);
        if(!updateTest) throw TestResponse.notFound(data);
        const resault = await testService.findById(updateTest);
        return res.send(TestResponse.Success(resault));

    } catch (e) {
        return next(e);
    }
}

export async function deleteTestHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.TEST_UPDATE);
        const data = await validateIt(req.params, TestDto, DtoGroups.DELETE);
        console.log(data)
        const test = await testService.findById(data._id);
        console.log("test :   ",test);
        if(!test) throw TestResponse.notFound(data._id);
        const del = await testService.deleteOne(test._id);
        return res.send(TestResponse.Success(del));
    } catch (e) {
        return next(e);
    }
}