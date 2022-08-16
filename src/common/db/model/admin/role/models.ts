import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.ROLE,
    },
})
@index(
    {
        name: 1,
    },
    {
        unique: true,
        background: true,
        name: 'rolename',
        partialFilterExpression: { isDelete: { $eq: false } }
    }
)

@index(
    {
        isDeleted: 1,
    },
    {
        background: true,
        name: 'deleted',
        partialFilterExpression: { isDeleted: { $eq: false } }
    },
)

export class Role extends BaseModel {
    @prop({
        trim: true,
        required: true,
    })
    name: string;

    //category
    @prop({
        default: false
    })
    category: boolean;

    @prop({
        default: false
    })
    categoryCreate: boolean;

    @prop({
        default: false
    })
    categoryUpdate: boolean;

    @prop({
        default: false
    })
    categoryDelete: boolean;

    

        //news
        @prop({
            default: false
        })
        news: boolean;
    
        @prop({
            default: false
        })
        newsCreate: boolean;
    
        @prop({
            default: false
        })
        newsUpdate: boolean;
    
        @prop({
            default: false
        })
        newsDelete: boolean;
    
    


    /** ******************************* */

    // ---  users ----

    //teacher
    @prop({
        default: false
    })
    teacher: boolean;

    @prop({
        default: false
    })
    teacherCreate: boolean;

    @prop({
        default: false
    })
    teacherUpdate: boolean;

    @prop({
        default: false
    })
    teacherDelete: boolean;


    // --------------------------------------------

    //student
    @prop({
        default: false
    })
    student: boolean;


    @prop({
        default: false
    })
    studentUpdate: boolean;

    @prop({
        default: false
    })
    studentDelete: boolean;
    /** ******************************* */


    //role
    @prop({
        default: false
    })
    role: boolean;

    @prop({
        default: false
    })
    roleCreate: boolean;

    @prop({
        default: false
    })
    roleUpdate: boolean;

    @prop({
        default: false
    })
    roleDelete: boolean;



    /** ******************************* */

    //employee
    @prop({
        default: false
    })
    employee: boolean;

    @prop({
        default: false
    })
    employeeCreate: boolean;

    @prop({
        default: false
    })
    employeeUpdate: boolean;

    @prop({
        default: false
    })
    employeeDelete: boolean;

    /** ******************************* */

    @prop({
        default: false
      })
      statistics: boolean;
}

    export const RoleModel = getModelForClass(Role);