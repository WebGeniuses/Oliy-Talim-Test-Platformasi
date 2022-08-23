import { Types } from "mongoose";
import { TestResponse } from "../../../../../../../../common/db/model/admin/class/subject/chapter/thema/test/exception";
import { QuizResponse } from "../../../../../../../../common/db/model/user/test/quiz/exception";
import { TestStatus } from "../../../../../../../../common/db/model/user/test/quiz/model";
import { questionService } from "../../../../../../../../common/services/Admin/class/subject/chapter/thema/test/questions/question.service";
import { testService } from "../../../../../../../../common/services/Admin/class/subject/chapter/thema/test/test.service";
import { quizService } from "../../../../../../../../common/services/user/users/quiz.service";
import { QuizDto, QuizDtoGroup, QuizGetDto, QuizPagingDto } from "../../../../../../../../common/validation/dto/user/quiz/quiz.dto";
import { validateIt } from "../../../../../../../../common/validation/validate";


export async function registerTestHandler(req, res, next) {
    try {
        req.body.userId = req.userId.toString();
        const data = await validateIt(req.body, QuizDto, QuizDtoGroup.START);

        const allready = await quizService.findUserAndTest(data);
        console.log("Ok:     : ", allready)
        if (allready) throw QuizResponse.Alreadystarted(data.testId);
        const test = await testService.findById(data.testId);
        if (!test) throw TestResponse.NotFound(data.testId);

        await quizService.checkStatus(data.userId);

        const newTest = await testService.getByIdTest(data.testId);
        if (!newTest) throw TestResponse.notFound(data.testId)

        let query = {
            testId: new Types.ObjectId(data.testId)
        }


        const count = await questionService.getCount(query);
        console.log(count)
        data.questionCount = count;
        data.status = TestStatus.STARTED;
        data.startedAt = new Date();

        const resault = await quizService.create(data)
        return res.send(QuizResponse.Success(resault))
    } catch (e) {
        return next(e);
    }
}


export async function finishedQuizHandler(req, res, next) {
    try {
        req.body.userId = req.userId.toString();
        const data = await validateIt(req.body, QuizDto, QuizDtoGroup.END)

        const quiz1 = await quizService.getQuizByUserIdAndTestId(data.userId, data.testId);
        const test = await quizService.testResault(data.userId, data.testId, quiz1.startedAt)

        const percent = parseInt(((test.count / quiz1.questionCount) * 100).toFixed());

        var date1 = new Date(quiz1.startedAt);
        var date2 = new Date(new Date());

        const time = date2.getTime() - date1.getTime()

        console.log( "vaqt : ", (time / (1000)) )
        // console.log(typeof time)
        const resault = {
            status: TestStatus.FINISHED,
            finishedAt: new Date(),
            correctAnswersCount: test.count,
            percent: percent,
            questionCount: quiz1.questionCount,
            // timeSpent: time,

        }
        console.log("resault:  ", resault)
        const quiz = await quizService.updateOne(quiz1._id, resault)
        console.log("quiz:   ", quiz)

        return res.send(QuizResponse.Success(quiz));

    } catch (e) {
        return next(e);
    }
}

export async function getDoneTestPagingHandler(req, res, next) {
    try {
        req.query.userId = req.userId.toString();
        console.log("-----------------      ", req.query);
        const data = await validateIt(req.query, QuizPagingDto, QuizDtoGroup.PAGENATION)
        const quiz = await quizService.getTestDonePaging(data);
        console.log(quiz)
        const id = {
            userId: data.userId
        }

        const count = await quizService.getCount(id);
        const resault = {
            data: quiz,
            doneTestCount: count
        }
        return res.send(QuizResponse.Success(resault))
    } catch (e) {
        return next(e);
    }
}
