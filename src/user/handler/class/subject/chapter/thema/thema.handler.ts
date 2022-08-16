import { ThemaResponse } from "../../../../../../common/db/model/admin/thema/exception";
import { themaService } from "../../../../../../common/services/Admin/class/subject/chapter/thema/thema.service";
import { ThemaGetDto, ThemaDto } from "../../../../../../common/validation/dto/admin/class/subject/chapter/thema/thema.dto";
import { DtoGroups } from "../../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../../common/validation/validate";

export async function getPagingThemaHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, ThemaGetDto, DtoGroups.PAGENATION);
        const thema = await themaService.getpagingThema(data);
        const count = await themaService.getCount();
        if(!thema) throw ThemaResponse.NotFound(data);
        const resault = {
            data: thema,
            themaCount: count,
        };
        return res.send(ThemaResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}

export async function getByIdThemaHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, ThemaDto, DtoGroups.GET_BY_ID)
        const thema = await themaService.findById(data._id);
        if(!thema) throw ThemaResponse.notFound(data._id);
        return res.send(ThemaResponse.Success(thema));
    } catch (error) {
        return next(error)
    }
}
