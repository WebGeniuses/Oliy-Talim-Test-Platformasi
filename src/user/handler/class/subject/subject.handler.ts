import { SubjectResponse } from "../../../../common/db/model/admin/subject/exception";
import { subjectService } from "../../../../common/services/Admin/class/subject/subject.service";
import { SubjectDto, SubjectGetDto } from "../../../../common/validation/dto/admin/class/subject/subject.dto";
import { DtoGroups } from "../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../common/validation/validate";

export async function getByIdSubjectHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, SubjectDto, DtoGroups.GET_BY_ID)
        const Class = await subjectService.findById(data._id);
        if(!Class) throw SubjectResponse.notFound(data._id);
        return res.send(SubjectResponse.Success(Class));
    } catch (error) {
        return next(error)
    }
}

export async function getPagingSubjectHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, SubjectGetDto, DtoGroups.PAGENATION);
        const subject = await subjectService.getPaging(data);
        console.log("subject          -----------     ", subject);
        console.log("data           ----------    ", data)
        const count = await subjectService.getCount();
        const resault = {
            data: subject,
            subjectCount: count
        }
        console.log("resault         -----------------      ", resault)

        return res.send(SubjectResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}