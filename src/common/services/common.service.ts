import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { AggregateOptions, Query, QueryOptions, Types } from "mongoose";
import { PagingDto } from "../validation/dto/paging.dto";


export class CommonServices<T> {
  constructor(public model: ModelType<T>) { }
  public async find<T>(
    query,
    options?: QueryOptions,
    projection: object = { __v: 0 }
  ) {
    try {
      return await this.model.find(query, projection, options);
    } catch (e) {
      throw e;
    }
  }

  public async findOne<T>(
    query,
    options?: QueryOptions,
    projection: object = { __v: 0 ,}
  ) {
    try {
      return await this.model.findOne(query, projection, options)
    } catch (e) {
      throw e;
    }
  }

  public async findById<T>(
    id: string | Types.ObjectId | Ref<T>,
    options?: QueryOptions,
    projection: object = { __v: 0 }
  ) {
    try {
      return await this.model.findOne(
        { _id: id, isDeleted: false },
        projection,
        options
      )
    } catch (e) {
      throw e;
    }
  }

  public async create<T>(
    data: any,
    projection: object = { __v: 0, isDelete: false },
    options?: QueryOptions
  ) {
    try {
      const saved = await this.model.create([data], options);
      return await this.model.findById(saved[0]._id, projection, options)
    } catch (e) {
      throw e;
    }
  }

  public async createMany<T>(
    data: any[],
    options: QueryOptions,
  ) {
    try {
      return await this.model.insertMany(data, options);
    } catch (e) {
      throw e;
    }
  }

  public async insertMany<T>(
    data,
    options?
  ) {
    try {
      return await this.model.insertMany(data, options);
    } catch (e) {
      throw e;
    }
  }

  public async deleteOne<T>(id, options?: QueryOptions) {
    try {
      return await this.model.findByIdAndUpdate(id, { isDeleted: true }, options);
    } catch (e) {
      throw e;
    }
  }

  public async updateOne<T>(
    id: Types.ObjectId | string | Ref<T>,
    data,
    options?: QueryOptions,
  ) {
    try {
      await this.model.findByIdAndUpdate(id, data, options);
      return await this.model.findById(id, { isDelete: 0, __v: 0 });
    } catch (e) {
      throw e;
    }
  }

  public async updateOneByQuery<T>(query, data, options?: QueryOptions) {
    try {
      return await this.model.findOneAndUpdate(query, data, options);
    } catch (e) {
      throw e;
    }
  }

  public async updateMany<T>(query, data, options?: QueryOptions) {
    try {
      return await this.model.findByIdAndUpdate(query, data, options);
    } catch (e) {
      throw e;
    }
  }

  public async aggregate<T>(pipeline: Array<any>, options?: AggregateOptions) {
    try {
      return await this.model
        .aggregate(pipeline, options)
        .allowDiskUse(true)
        .exec();
    } catch (e) {
      throw e;
    }
  }

  public async getCount(query: object = {}) {
    try {
      return await this.model.countDocuments({isDeleted:false, ...query});
    } catch (e) {
      throw e;
    }
  }
  


  public async findPaging<T>(
    query,
    dto: PagingDto,
    additional_pipeline: any = [
      {
        $project: {
          __v: 0,
        },
      },
    ],
    sort = null
  ) {
    try {
      const { limit, page, sortBy, asc } = dto;

      const $match = {
        $match: query,
      };

      const $sort = {
        $sort: {
          createdAt: -1,
        },
      };

      if (sortBy) {
        $sort.$sort = {} as any;
        $sort.$sort[`${sortBy}`] = asc > 0 ? 1 : -1;
      } else if (sort) {
        $sort.$sort = sort;
      }

      const $skip = {
        $skip: limit * (page - 1),
      };

      const $limit = {
        $limit: limit,
      };

      let pipeline: Array<any> = [$match, $sort, $skip, $limit];

      if (additional_pipeline.length > 0) {
        pipeline = [...pipeline, ...additional_pipeline];
      }
      console.log(34, pipeline);
      
      const data = await this.model
        .aggregate(pipeline)
        .allowDiskUse(true)
        .exec();
// console.log("------ksks--- data: ", data)
      return data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }



} 