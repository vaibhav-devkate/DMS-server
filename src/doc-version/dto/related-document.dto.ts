import { IsNumber, IsString } from 'class-validator';

export class RelatedDocumentDto {
 @IsNumber()
 id: number;

 @IsString()
 name: string;
}