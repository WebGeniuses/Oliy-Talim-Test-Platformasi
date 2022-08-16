import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsNumber, isNumberString, IsOptional, IsPositive, IsString } from 'class-validator';
import { DtoGroups } from '../dtoGroups.dto';

export class PagingDto {
  @Transform(({ value }) => Number(value))
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    {
      groups: [DtoGroups.PAGENATION]
    }
  )
  @IsPositive({
    groups: [DtoGroups.PAGENATION]
  })
  limit!: number;

  @Transform(({ value })=> Number(value))
  @IsNumber(
    {
      allowInfinity:false,
      allowNaN:false,
      maxDecimalPlaces:0,
    },
    {
      groups:[DtoGroups.PAGENATION]
    }
  )

  page!: number;

  @Expose({ toClassOnly: true})
  @Transform(({ value })=> value?.trim() || '')
  @IsOptional({
    groups:[DtoGroups.PAGENATION]
  })
  @IsString({
    groups:[DtoGroups.PAGENATION]
  })
  search?: string;
  
  @IsOptional({
    groups:[DtoGroups.PAGENATION]
  })
  @IsDateString(
    {
      strict:false,
    },
    {
      groups:[DtoGroups.PAGENATION]
    }
  )
  updateAt?: string;

  @IsOptional({
    groups:[DtoGroups.PAGENATION]
  })
  @IsDateString(
    {
      strict: false,
    },
    {
      groups:[DtoGroups.PAGENATION]
    }
  )
  createAt?: string;

  @IsOptional({
    groups:[DtoGroups.PAGENATION]
  })
  @IsString({
    groups:[DtoGroups.PAGENATION]
  })
  sortBy?: string;

  @Transform(({ value })=> Number(value))
  @IsNumber({
    allowInfinity:false,
    allowNaN:false,
  })
  asc?:number

  

}
