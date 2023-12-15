import { PartialType } from '@nestjs/swagger';
import { CreateDocVersionDto } from './create-doc-version.dto';

export class UpdateDocVersionDto extends PartialType(CreateDocVersionDto) {}
