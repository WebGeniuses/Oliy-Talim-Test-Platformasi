import { ClassResponse } from "../../../common/db/model/admin/class/exception";
import { classService } from "../../../common/services/Admin/class/class.service";
import { ClassDto, ClassGetDto } from "../../../common/validation/dto/admin/class/class.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";

export async function getByIdClassHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, ClassDto, DtoGroups.GET_BY_ID)
        const Class = await classService.findById(data._id);
        if(!Class) throw ClassResponse.notFound(data._id);
        return res.send(ClassResponse.Success(Class));
    } catch (error) {
        return next(error)
    }
}

export async function getPagingClassHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, ClassGetDto, DtoGroups.PAGENATION) ;
        const Class = await classService.getPagingClass(data);
        console.log(Class)
        const count = await classService.getCount();
        const resault = {
            data: Class,
            ClassCount: count
        }
        return res.send(ClassResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}