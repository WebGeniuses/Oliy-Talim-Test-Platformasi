import { NewsResponse } from "../../../common/db/model/admin/news/exception";
import { newsService } from "../../../common/services/Admin/news/news.service";
import { NewsGetDto, NewsDto } from "../../../common/validation/dto/admin/news/news.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";


export async function getPagingNewsHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, NewsGetDto, DtoGroups.PAGENATION) ;
        const news = await newsService.getPagingNews(data);
        console.log(news)
        const count = await newsService.getCount();
        const resault = {
            data: news,
            NewsCount: count
        }
        return res.send(NewsResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}

export async function getByIdNewsHandler(req, res, next){
    try {
        const data =  await validateIt(req.params, NewsDto, DtoGroups.GET_BY_ID);
        const news = await newsService.findById(data);
        return res.send(NewsResponse.Success(news));
    } catch (e) {
        return next(e);
    }
}