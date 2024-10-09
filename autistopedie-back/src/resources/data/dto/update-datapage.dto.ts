import { PartialType } from '@nestjs/mapped-types';
import { CreateDataPageDto } from './create-datapage.dto';

export class UpdateDataPageDto extends PartialType(CreateDataPageDto) {}
