import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { SubjectResponse } from "../../../../db/model/admin/class/subject/exceptions";
import { Subject, SubjectModel } from "../../../../db/model/admin/class/subject/model";
import { SubjectDto, SubjectGetDto } from "../../../../validation/dto/admin/class/subject/subject.dto";
import { PagingDto } from "../../../../validation/dto/paging.dto";
import { CommonServices } from "../../../common.service";

class SubjectServisce extends CommonServices<Subject> {
    constructor(model: ModelType<Subject>){
        super(model);
    }

    public async createSubject(data){
        try {
            return await super.create(data);
        } catch(e){
            if(e.code == 11000) throw SubjectResponse.AllreadyExist(e);
            return e;
        }
    }

    public async getPaging<T>(data:SubjectGetDto){
        try {
            let query = {

                isDeleted: false,
                classId: new Types.ObjectId(data.classId)
            };
            console.log("query:   ",query);

            const $project = {
                $project: {
                    _id:1,
                    subjectName:1,
                    classId:1,
                    isDeleted:1
                }
            };

            const $pipeline = [$project];
            return await this.findPaging(query, data, $pipeline);
        } catch (e) {
            throw e;
        }
    }


    // public async getPagingAll<T>(data:SubjectGetDto){
    //     try {
    //         let query = {
    //             isDeleted: false,
    //         };
    //         console.log("query:   ",query);

    //         const $project = {
    //             $project: {
    //                 _id:1,
    //                 subjectName:1,
    //                 classId:1,
    //                 isDeleted:1
    //             }
    //         };

    //         const $pipeline = [$project];
    //         return await this.findPaging(query, data, $pipeline);
    //     } catch (e) {
    //         throw e;
    //     }
    // }
}



export const subjectService = new SubjectServisce(SubjectModel);