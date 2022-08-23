import { Types } from "mongoose";
import { QuestionResponse } from "../../../../../../../../common/db/model/admin/class/subject/chapter/thema/test/question/exception";
import { questionService } from "../../../../../../../../common/services/Admin/class/subject/chapter/thema/test/questions/question.service";
import { QuestionGetDto } from "../../../../../../../../common/validation/dto/admin/class/subject/chapter/thema/test/question/question.dto";
import { DtoGroups } from "../../../../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../../../../common/validation/validate";


export async function getPagingQuestion(req, res, next) {
    try {
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