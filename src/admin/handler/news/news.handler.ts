import { validate } from "class-validator";
import { Roles } from "../../../common/constants/roles";
import { NewsResponse } from "../../../common/db/model/admin/news/exception";
import { BaseResponse } from "../../../common/reporter/base.response";
import { newsService } from "../../../common/services/Admin/news/news.service";
import { roleService } from "../../../common/services/Admin/role/role.service";
import { NewsDto, NewsGetDto } from "../../../common/validation/dto/admin/news/news.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";
import { deleteTestHandler } from "../class/subject/chapter/thema/test/test.handler";


export async function creatNewsHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.NEWS_CREATE);
        const data = await validateIt(req.body, NewsDto, DtoGroups.CREATE);

        console.log(data)
        const news = await newsService.create(data);
        console.log(news);
        return res.send(NewsResponse.Success(news._id))

    } catch (e) {
        return next(e);
    }
}

export async function getPagingNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.NEWS);
        const data = await validateIt(req.query, NewsGetDto, DtoGroups.PAGENATION) ;
        const news = await newsService.getPagingNewsWithCategory(data);
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
        await roleService.hasAccess(req.roleId, Roles.NEWS);
        const data =  await validateIt(req.params, NewsDto, DtoGroups.GET_BY_ID);
        const news = await newsService.findById(data);
        return res.send(NewsResponse.Success(news));
    } catch (e) {
        return next(e);
    }
}

export async function updateNewsHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.NEW_UPDATE);
        const data = await validateIt(req.body, NewsDto, DtoGroups.UPDATE)
        const news = await newsService.findById(data._id);
        if(!news) throw NewsResponse.NotFound(data._id);
        const updateNews = await newsService.updateOne(data._id, data);
        return await res.send(NewsResponse.Success(updateNews));

    } catch (e) {
        return next(e);
    }
}

export async function deleteNewsHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.NEW_DELETE);
        const data = await validateIt(req.params, NewsDto, DtoGroups.DELETE)
        const news = await newsService.findById(data._id);
        if(!news) throw NewsResponse.NotFound(data._id);
        console.log(news);
        const updateNews = await newsService.deleteOne(news._id);
        console.log(updateNews)
        // const resault = {
        //     Delete:updateNews
        // }
        return await res.send(NewsResponse.Success(updateNews));
    } catch (e) {
        return next(e);
    }
}
