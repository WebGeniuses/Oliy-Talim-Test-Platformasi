import { TestResponse } from "../../../../../../../../common/db/model/admin/class/subject/chapter/thema/test/exception";
import { AnswersResponse } from "../../../../../../../../common/db/model/user/test/answers/exception";
import { QuizResponse } from "../../../../../../../../common/db/model/user/test/quiz/exception";
import { TestStatus } from "../../../../../../../../common/db/model/user/test/quiz/model";
import { BaseResponse } from "../../../../../../../../common/reporter/base.response";
import { testService } from "../../../../../../../../common/services/Admin/class/subject/chapter/thema/test/test.service";
import { answerService } from "../../../../../../../../common/services/user/users/answer.service";
import { quizService } from "../../../../../../../../common/services/user/users/quiz.service";
import { SetAnswerDto } from "../../../../../../../../common/validation/dto/user/anwers/answer.dto";
import { DtoGroups } from "../../../../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../../../../common/validation/validate";
import cron from "node-cron";
import { QuizDto } from "../../../../../../../../common/validation/dto/user/quiz/quiz.dto";


export async function createAnswerHandler(req, res, next) {
    try {
        req.body.userId = (req.userId).toString();
        const data = await validateIt(req.body, SetAnswerDto, DtoGroups.CREATE);

        const quiz = await quizService.getQuizByUserIdAndTestId(data.userId, data.testId);
        console.log("quiz:  ", QuizDto);
        const duration = quiz.test.duration;
        console.log("duration : ", duration)
        let Cron = cron.schedule("* * * * * *", async () => {
            var date1 = new Date(quiz.startedAt);
            const time = new Date(date1.getTime() + 1000 * 60 * (duration))

            if(TestStatus.FINISHED){
                const updateQuiz = await quizService.updateOne(quiz._id, { status: TestStatus.FINISHED, finishedAt: new Date() });
                return res.send(AnswersResponse.Success(updateQuiz))

            }

            if (new Date >= time) {
                console.log("time is finished!!!!")
                Cron.stop();

                const updateQuiz = await quizService.updateOne(quiz._id, { status: TestStatus.FINISHED, finishedAt: new Date() });
                return res.send(AnswersResponse.TimeFinished(updateQuiz))

            }
            // console.log("vaqt : ", ((new Date(date1.getTime() + 1000 * 60 * (duration))).getTime() - (new Date()).getTime()) / (1000))
        })


      
        const resault = await answerService.create(data);
        return res.send(AnswersResponse.Success(resault))


    } catch (e) {
        return next(e);
    }
}