import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../../../../constants/collections";
import { TestResponse } from "../../../../../../../db/model/admin/class/subject/chapter/thema/test/exception";
import { Test, TestModel } from "../../../../../../../db/model/admin/class/subject/chapter/thema/test/model";

import { TestGetDto } from "../../../../../../../validation/dto/admin/class/subject/chapter/thema/test/test.dto";
import { CommonServices } from "../../../../../../common.service";


class TestService extends CommonServices<Test>{
    constructor(model: ModelType<Test>) {
        super(model);
    }

    public async createTest(data) {
        try {
            return await super.create(data);
        } catch (e) {
            return e;
        }
    }

    public async getById(id) {
        const res = await this.findById(new Types.ObjectId(id))
        if (!res) throw TestResponse.NotFound(id)

        return res;
    }


    public async getPagingTest<T>(data: TestGetDto) {
        try {
            let query = {
                // $match: {
                isDeleted: false,
                themaId: new Types.ObjectId(data.themaId)
                // }
            };

            const $lookupThema = {
                $lookup: {
                    from: CollectionNames.THEMA,
                    localField: 'themaId',
                    foreignField: '_id',
                    as: 'thema'
                }
            }


            const $lookupChapter = {
                $lookup: {
                    from: CollectionNames.CHAPTER,
                    localField: 'thema.chapterId',
                    foreignField: '_id',
                    as: 'chapter'
                }
            }
            const $lookupSubject = {
                $lookup: {
                    from: CollectionNames.SUBJECT,
                    localField: 'chapter.subjectId',
                    foreignField: '_id',
                    as: 'subject'
                }
            }

            const $lookupClass = {
                $lookup: {
                    from: CollectionNames.CLASS,
                    localField: 'subject.classId',
                    foreignField: '_id',
                    as: 'class'
                }
            }

            const $lookupQuestion = {
                $lookup: {
                    from: CollectionNames.QUESTION,
                    localField: '_id',
                    foreignField: 'testId',
                    as: 'question'
                }
            }

            const $project = {
                $project: {
                    testName: 1,
                    testCount: 1,
                    testStart: 1,
                    duration: 1,

                    class: {
                        classNumber: 1,
                    },

                    subject: {
                        subjectName: 1,
                    },

                    chapter: {
                        chapterName: 1,
                    },

                    thema: {
                        themaName: 1,
                    },

                    question: {
                        title: 1,
                        answer: {
                            title: 1
                        },
                    }
                }
            }

            const $pipeline = [
                // $match,
                $lookupThema,
                $lookupChapter,
                $lookupSubject,
                $lookupClass,
                $lookupQuestion,
                $project
            ];
            // const $pipeline = [$project];
            return await this.findPaging(query, data, $pipeline)
        } catch (e) {
            return e;
        }
    }


    /// get By Id test;
    public async getByIdTest(id) {
        try {
            let $match = {
                $match: {
                    isDeleted: false,
                    _id: new Types.ObjectId(id)
                }
            };

            const $lookupThema = {
                $lookup: {
                    from: CollectionNames.THEMA,
                    localField: 'themaId',
                    foreignField: '_id',
                    as: 'thema'
                }
            }


            const $lookupChapter = {
                $lookup: {
                    from: CollectionNames.CHAPTER,
                    localField: 'thema.chapterId',
                    foreignField: '_id',
                    as: 'chapter'
                }
            }
            const $lookupSubject = {
                $lookup: {
                    from: CollectionNames.SUBJECT,
                    localField: 'chapter.subjectId',
                    foreignField: '_id',
                    as: 'subject'
                }
            }

            const $lookupClass = {
                $lookup: {
                    from: CollectionNames.CLASS,
                    localField: 'subject.classId',
                    foreignField: '_id',
                    as: 'class'
                }
            }

            const $lookupQuestion = {
                $lookup: {
                    from: CollectionNames.QUESTION,
                    localField: '_id',
                    foreignField: 'testId',
                    as: 'question'
                }
            }

            const $project = {
                $project: {
                    testName: 1,
                    testCount: 1,
                    testStart: 1,
                    duration: 1,
                    thema: {
                        themaName: 1,
                    },
                    chapter: {
                        chapterName: 1,
                    },
                    subject: {
                        subjectName: 1,
                    },
                    class: {
                        name: 1,
                    },
                    question: {
                        title: 1,
                        answer: {
                            title: 1
                        },
                    }
                }
            }

            const $pipeline = [
                $match,
                $lookupThema,
                $lookupChapter,
                $lookupSubject,
                $lookupClass,
                $lookupQuestion,
                $project
            ];
            const data = (await this.aggregate($pipeline)).shift();
            if (!data) throw TestResponse.NotFound(data);
            return data;

        } catch (e) {
            return e
        }
    }


}

export const testService = new TestService(TestModel);