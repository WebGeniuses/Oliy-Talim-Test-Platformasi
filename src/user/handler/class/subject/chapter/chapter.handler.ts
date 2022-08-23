import { ChapterResponse } from "../../../../../common/db/model/admin/class/subject/chapter/exception";
import { chapterService } from "../../../../../common/services/Admin/class/subject/chapter/chapter.service";
import { ChapterGetDto, ChapterDto } from "../../../../../common/validation/dto/admin/class/subject/chapter/chapter.dto";
import { DtoGroups } from "../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../common/validation/validate";

export async function getPagingChapterHandler(req, res, next) {
    try {
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
        const data = await validateIt(req.params, ChapterDto, DtoGroups.GET_BY_ID)
        const chapter = await chapterService.findById(data._id);
        if(!chapter) throw ChapterResponse.notFound(data._id);
        return res.send(ChapterResponse.Success(chapter));
    } catch (error) {
        return next(error)
    }
}