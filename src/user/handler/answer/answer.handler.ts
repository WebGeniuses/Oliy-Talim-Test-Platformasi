import { AnswersResponse } from "../../../common/db/model/user/test/answers/exception";
import { answerService } from "../../../common/services/user/users/answer.service";
import { SetAnswerDto } from "../../../common/validation/dto/user/anwers/answer.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";


export async function createSetAnswerHandler(req, res, next) {
    try {
        req.body.userId = req.userId;
        const data = await validateIt(req.body, SetAnswerDto, DtoGroups.CREATE);
        const answer = await answerService.create(data);
        return await res.send(AnswersResponse.Success(answer));
    } catch (e) {
        return next(e);
    }
}

export async function getQidhndlerstion(req, res, next) {
    const data = await validateIt(req.body, SetAnswerDto, DtoGroups.GET_BY_ID)

}