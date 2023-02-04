import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectionDto } from './create-selection.dto';

export class UpdateSelectionDto extends PartialType(CreateSelectionDto) {}
