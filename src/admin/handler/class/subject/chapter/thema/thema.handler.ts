import { Roles } from "../../../../../../common/constants/roles";
import { ThemaResponse } from "../../../../../../common/db/model/admin/class/subject/chapter/thema/exception";
import { themaService } from "../../../../../../common/services/Admin/class/subject/chapter/thema/thema.service";
import { roleService } from "../../../../../../common/services/Admin/role/role.service";
import { ThemaDto, ThemaGetDto } from "../../../../../../common/validation/dto/admin/class/subject/chapter/thema/thema.dto";
import { DtoGroups } from "../../../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../../../common/validation/validate";



export async function createThemaHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.THEMA_CREATE);
    const data = await validateIt(req.body, ThemaDto, DtoGroups.CREATE);
    const thema =  await themaService.createThema(data);
    return res.send(ThemaResponse.Success(thema));
    } catch (e) {
        return next(e);
    }
}

export async function getPagingThemaHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.THEMA);
        const data = await validateIt(req.query, ThemaGetDto, DtoGroups.PAGENATION);
        const thema = await themaService.getpagingThema(data);
        const Id = {
            chapterId: data.chapterId
        }
        const count = await themaService.getCount(Id);
        if(!thema[0]) throw ThemaResponse.NotFound(data);
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
        // await roleService.hasAccess(req.roleId, Roles.THEMA)
        const data = await validateIt(req.params, ThemaDto, DtoGroups.GET_BY_ID)
        const thema = await themaService.findById(data._id);
        if(!thema) throw ThemaResponse.notFound(data._id);
        return res.send(ThemaResponse.Success(thema));
    } catch (error) {
        return next(error)
    }
}


export async function updateThemaHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CHAPTER_UPDATE);
        const data = await validateIt(req.body, ThemaDto, DtoGroups.UPDATE);
        const id = data._id;
        const thema = await themaService.findById(id);
        console.log(thema);
        if (!thema) throw ThemaResponse.notFound(id);
        const updateThema = await themaService.updateOne(id, data);
        console.log("Update  $$$$$   ", updateThema._id);
        if(!updateThema) throw ThemaResponse.notFound(data);
        const resault = await themaService.findById(updateThema);
        return res.send(ThemaResponse.Success(resault));

    } catch (e) {
        return next(e);
    }
}

export async function deleteThemaHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.CHAPTER_DELETE);
        const data = await validateIt(req.params, ThemaDto, DtoGroups.DELETE);
        console.log(data)
        const thema = await themaService.findById(data._id);
        console.log("thema  :   ",thema);
        if(!thema) throw ThemaResponse.notFound(data._id);
        const del = await themaService.deleteOne(thema._id);
        return res.send(ThemaResponse.Success(del));
    } catch (e) {
        return next(e);
    }
}