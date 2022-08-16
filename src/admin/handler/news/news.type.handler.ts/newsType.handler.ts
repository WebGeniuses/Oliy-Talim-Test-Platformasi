import { Roles } from "../../../../common/constants/roles";
import { NewsTypeResponse } from "../../../../common/db/model/admin/news/newsType/exception";
import { newsTypeService } from "../../../../common/services/Admin/news/newsType/newsType.service";
import { roleService } from "../../../../common/services/Admin/role/role.service";
import { NewsTypeDto, NewsTypeGetDto } from "../../../../common/validation/dto/admin/news/newsType.dto.ts/newsType.dto";
import { DtoGroups } from "../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../common/validation/validate";



export async function createNewsTypeHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.NEWS_CREATE);
        const data = await validateIt(req.body, NewsTypeDto, DtoGroups.CREATE);
        const category = await newsTypeService.create(data);
        return res.send(NewsTypeResponse.Success(category));
    } catch (e) {
        return next(e);
    }
}

export async function getPagingNewsTypeHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.NEWS);
        const data = await validateIt(req.query, NewsTypeGetDto, DtoGroups.PAGENATION) ;
        const news = await newsTypeService.getPagingNewsType(data);
        console.log(news)
        const count = await newsTypeService.getCount();
        const resault = {
            data: news,
            TypeCount: count
        }
        return res.send(NewsTypeResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}

export async function getByIdNewsTypeHandler(req, res, next){
    try {
        // await roleService.hasAccess(req.roleId, Roles.NEWS);
        const data =  await validateIt(req.params, NewsTypeDto, DtoGroups.GET_BY_ID);
        const news = await newsTypeService.findById(data);
        return res.send(NewsTypeResponse.Success(news));
    } catch (e) {
        return next(e);
    }
}

export async function updateNewsTypeHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.NEW_UPDATE);
        const data = await validateIt(req.body, NewsTypeDto, DtoGroups.UPDATE)
        const news = await newsTypeService.findById(data._id);
        if(!news) throw NewsTypeResponse.NotFound(data._id);
        const updateNews = await newsTypeService.updateOne(data._id, data);
        return await res.send(NewsTypeResponse.Success(updateNews));

    } catch (e) {
        return next(e);
    }
}

export async function deleteNewsTypeHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.NEW_DELETE);
        const data = await validateIt(req.params, NewsTypeDto, DtoGroups.DELETE)
        const news = await newsTypeService.findById(data._id);
        if(!news) throw NewsTypeResponse.NotFound(data._id);
        console.log(news);
        const updateNews = await newsTypeService.deleteOne(news._id);
        console.log(updateNews)
        // const resault = {
        //     Delete:updateNews
        // }
        return await res.send(NewsTypeResponse.Success(updateNews));
    } catch (e) {
        return next(e);
    }
}