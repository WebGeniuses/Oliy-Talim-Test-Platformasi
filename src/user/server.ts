import express from "express";
import  cron  from "node-cron";
import { ENV } from "../common/config/config";
import { connectDB } from "../common/db/connector";
import { BaseResponse } from "../common/reporter/base.response";
import userRouter from './router/user.router';
import newsRouter from './router/news.router';
import classRouter from './router/class.router';
import subjectRouter from './router/subject.router';
import chapterRouter from './router/chapter.router';
import themaRouter from './router/thema.router';
import testRouter from './router/test.router';
import answerRouter from './router/answer.router';
import questionRouter from './router/question';
import quizRouter from './router/quiz.router';

!async function () {
    const app = express();
    await connectDB();
    app.use(express.json());
    app.use('/user', userRouter);
    app.use('/news', newsRouter);
    app.use("/class", classRouter);
    app.use("/subject", subjectRouter);
    app.use("/chapter", chapterRouter);
    app.use("/thema", themaRouter);
    app.use("/test", testRouter);
    app.use('/question', questionRouter);
    app.use('/quiz', quizRouter);
    app.use('/setAnswer', answerRouter);

    // const a = cron.schedule('* * * * * *', () => {
    //      
    // });
    // app.get('/', (req, res) => {
    //     res.send(`vaqt: ${a}, ` )
    // })


    app.use((req, res) => {
        res.status(404).send((BaseResponse.notFound({ 'URL': req.url })));
    })

    app.use((error, req, res, next) => {
        if (error instanceof BaseResponse) {
            res.status(400).send(error);
        }
        else res.status(400).send(BaseResponse.UnknowenError(error))
    })

    app.listen(ENV.STUDENT_PORT, ENV.HOST, () => console.log("User server ishadi http://localhost:" + ENV.STUDENT_PORT))
}()