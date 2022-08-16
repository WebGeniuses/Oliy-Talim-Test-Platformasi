import { Types } from "mongoose";
import { Roles } from "../../../../../../../../common/constants/roles";
import { QuestionResponse } from "../../../../../../../../common/db/model/admin/test/question/exception";
import { questionService } from "../../../../../../../../common/services/Admin/class/subject/chapter/thema/test/questions/question.service";
import { roleService } from "../../../../../../../../common/services/Admin/role/role.service";
import { QuestionGetDto, TestQuestionDto } from "../../../../../../../../common/validation/dto/admin/class/subject/chapter/thema/test/question/question.dto";
import { DtoGroups } from "../../../../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../../../../common/validation/validate";



export async function createQuestionHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.TEST_CREATE);
        console.log("ok")
        const data = await validateIt(req.body, TestQuestionDto, DtoGroups.CREATE);
        console.log("data:   ",data);
        const question = await questionService.createQuestion(data);
        return await res.send(QuestionResponse.Success(question));
    } catch (e) {
        return next(e);
    }
}

export async function getPagingQuestion(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.TEST_CREATE);
        const data = await validateIt(req.query, QuestionGetDto, DtoGroups.PAGENATION);
        const question = await questionService.GetPagingQuestions(data);
        let query = {
            testId: new Types.ObjectId(data.testId)
        }
        const testCount = await questionService.getCount(query)
        const resault  = {
            TestCount: testCount,
            Questions: question
        }
        return await res.send(QuestionResponse.Success(resault));
    } catch (e) {
        return next(e)
    }
}

export async function updateQuestionHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.TEST_UPDATE);
        const data = await validateIt(req.body, TestQuestionDto,DtoGroups.UPDATE);
        const id = data._id;
        const question = await questionService.findById(id);
        if(!question) throw QuestionResponse.notFound(id);
        const update = await questionService.updateOne(id, data);
        if(!update) throw QuestionResponse.NotFound(data);
        const resault = await questionService.findById(update._id);
        return res.send(QuestionResponse.Success(resault))
    } catch (e) {
        return next(e);
    }
}

export async function deleteQuestionHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.TEST_DELETE);
        const data = await validateIt(req.params, TestQuestionDto, DtoGroups.DELETE);
        const question = await questionService.findById(data._id);
        if(!question) throw QuestionResponse.NotFound(data);
        const del = await questionService.deleteOne(question._id);
        return await res.send(QuestionResponse.Success(del))
    } catch (e) {
        return next(e);
    }
}