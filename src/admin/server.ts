import express from 'express'
import { ENV } from "../common/config/config";
import { connectDB } from "../common/db/connector";
import { BaseResponse } from '../common/reporter/base.response';
import roleRouter from './router/role.router';
import employeeRouter from './router/employee.router';
import newsRouter from './router/news.router';
import classRouter from "./router/class.router";
import subjectRouter from "./router/subject.router";
import chapterRoute from "./router/chapter.router";
import themaRouter from "./router/thema.router";
import testRouter from "./router/test.router";
import questionRouter from './router/question.router';
import categoryRouter from './router/category.router';
import newsTypeRouter from './router/newsType.roter';
import regionRouter from  './router/region.router';
import userTypeRouter from './router/userType.router';



!async function () {
    const app = express();
    await connectDB();
    app.use(express.json());

    app.use("/role", roleRouter);
    app.use('/employee', employeeRouter);
    app.use('/news', newsRouter);
    app.use('/class', classRouter);
    app.use('/subject', subjectRouter);
    app.use('/chapter', chapterRoute);
    app.use("/thema", themaRouter);
    app.use('/test', testRouter);
    app.use('/question', questionRouter);
    app.use("/category", categoryRouter);
    app.use('/newstype', newsTypeRouter)
    app.use('/region', regionRouter);
    app.use('/usertype', userTypeRouter);


    // router error
    app.use((req, res) => {
        res.status(404).send(BaseResponse.notFound({ 'URL': req.url }));
    })


    ///Error Handler
    app.use((error, req, res, next) => {
        if (error instanceof BaseResponse) {
            res.status(400).send(error);
        }
        else res.status(400).send(BaseResponse.UnknowenError(error));
    })

    app.listen(ENV.ADMIN_PORT, ENV.HOST, () => console.log("Admin server ishladi http://localhost:" + ENV.ADMIN_PORT))

}()

