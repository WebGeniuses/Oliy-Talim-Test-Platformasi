import { Roles } from "../../../../../common/constants/roles";
import { ChapterResponse } from "../../../../../common/db/model/admin/chapter/exception";
import { chapterService } from "../../../../../common/services/Admin/class/subject/chapter/chapter.service";
import { roleService } from "../../../../../common/services/Admin/role/role.service";
import { ChapterDto, ChapterGetDto } from "../../../../../common/validation/dto/admin/class/subject/chapter/chapter.dto";
import { DtoGroups } from "../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../common/validation/validate";


export async function createChapterHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CHAPTER_CREATE);
        const data = await validateIt(req.body, ChapterDto, DtoGroups.CREATE);
        const chapter = await chapterService.createChapter(data);
        return res.send(ChapterResponse.Success(chapter));
    } catch (e) {
        return next(e);
    }
}

export async function getPagingChapterHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CHAPTER);
        const data = await validateIt(req.query, ChapterGetDto, DtoGroups.PAGENATION );
        const chapter = await chapterService.getpagingChapter(data);
        const count = await chapterService.getCount();
        const resault = {
            data: chapter,
            chapterCount: count
        }
        return res.send(ChapterResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}

export async function getByIdChapterHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CHAPTER)
        const data = await validateIt(req.params, ChapterDto, DtoGroups.GET_BY_ID)
        const chapter = await chapterService.findById(data._id);
        if(!chapter) throw ChapterResponse.notFound(data._id);
        return res.send(ChapterResponse.Success(chapter));
    } catch (error) {
        return next(error)
    }
}


export async function updateChapterHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CHAPTER_UPDATE);
        const data = await validateIt(req.body, ChapterDto, DtoGroups.UPDATE);
        const id = data._id;
        const chapter = await chapterService.findById(id);
        console.log(chapter);
        if (!chapter) throw ChapterResponse.notFound(id);
        const updateChapter = await chapterService.updateOne(id, data);
        console.log("Update  $$$$$   ", updateChapter._id);
        if(!updateChapter) throw ChapterResponse.notFound(data);
        const resault = await chapterService.findById(updateChapter);
        return res.send(ChapterResponse.Success(resault));

    } catch (e) {
        return next(e);
    }
}

export async function deleteChapterHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CHAPTER_DELETE);
        const data = await validateIt(req.params, ChapterDto, DtoGroups.DELETE);
        console.log(data)
        const chapter = await chapterService.findById(data._id);
        console.log("chapter :   ",chapter);
        if(!chapter) throw ChapterResponse.notFound(data._id);
        const del = await chapterService.deleteOne(chapter._id);
        return res.send(ChapterResponse.Success(del));
    } catch (e) {
        return next(e);
    }
}