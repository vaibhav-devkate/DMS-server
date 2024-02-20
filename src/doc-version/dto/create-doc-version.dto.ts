//export class CreateDocVersionDto {}
import { ApiProperty } from '@nestjs/swagger';
import {   IsNotEmpty } from 'class-validator';
//import { RelatedDocumentDto } from './related-document.dto';
export class CreateDocVersionDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  pdfname: string;


  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  pdfdata: Express.Multer.File;
 
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  pdftype: string;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  version: number;

  @ApiProperty({ type: ['string'] })
  selectedOptions: string;
 
 
}
