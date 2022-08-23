import { Roles } from "../../../../common/constants/roles";
import { SubjectResponse } from "../../../../common/db/model/admin/class/subject/exceptions";
import { subjectService } from "../../../../common/services/Admin/class/subject/subject.service";
import { roleService } from "../../../../common/services/Admin/role/role.service";
import { SubjectDto, SubjectGetDto } from "../../../../common/validation/dto/admin/class/subject/subject.dto";
import { PagingDto } from "../../../../common/validation/dto/paging.dto";
import { DtoGroups } from "../../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../../common/validation/validate";


export async function createSubjectHandler(req, res, next) {
    try {
        // await  roleService.hasAccess(req.roleId, Roles.SUBJECT_CREATE);
        const data = await validateIt(req.body, SubjectDto, DtoGroups.CREATE)
        const subject = await subjectService.createSubject(data);
        return res.send(SubjectResponse.Success(subject));
    } catch (e) {
        return next(e);
    }
}

export async function getByIdSubjectHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.SUBJECT)
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
        // await  roleService.hasAccess(req.roleId, Roles.SUBJECT);
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

export async function updateSubjectHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.SUBJECT_UPDATE);
        const data = await validateIt(req.body, SubjectDto, DtoGroups.UPDATE);
        const id = data._id;
        const Class = await subjectService.findById(id);
        console.log(Class);
        if (!Class) throw SubjectResponse.notFound(id);
        const updateSubject = await subjectService.updateOne(id, data);
        console.log("Update  $$$$$   ", updateSubject);
        // if(!updateclass) throw ClassResponse.notFound(data);
        const resault = await subjectService.findById(updateSubject);
        return res.send(SubjectResponse.Success(resault));

    } catch (e) {
        return next(e);
    }
}

export async function deleteSubjectHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.SUBJECT_DELETE);
        const data = await validateIt(req.params, SubjectDto, DtoGroups.DELETE);
        console.log(data)
        const subject = await subjectService.findById(data._id);
        console.log("subject :   ",subject);
        if(!subject) throw SubjectResponse.notFound(data._id);
        const del = await subjectService.deleteOne(subject._id);
        const resault = {
            deleted: del
          }
        return res.send(SubjectResponse.Success(resault));
    } catch (e) {
        return next(e);
    }
}