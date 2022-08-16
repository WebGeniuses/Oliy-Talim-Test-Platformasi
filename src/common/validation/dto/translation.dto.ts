import { IsOptional, IsString, Matches, MinLength, ValidateIf } from 'class-validator';
import { DtoGroups } from '../dtoGroups.dto';

export class TranslationDtoGroup extends DtoGroups { }

export class TranslationDto {
  @IsString({
    groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
})
default!: string;

  @IsOptional({
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  @IsString({
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  @MinLength(1, {
    message: 'Title is too short. Minimal length is 1 characters',
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  uz?: string;

  @IsOptional({
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  @IsString({
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  @MinLength(1, {
    message: 'Title is too short. Minimal length is 1 characters',
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  en?: string;

  @IsOptional({
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  @IsString({
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  @MinLength(1, {
    message: 'Title is too short. Minimal length is 1 characters',
    groups: [TranslationDtoGroup.CREATE, TranslationDtoGroup.UPDATE],
  })
  ru?: string;
}
