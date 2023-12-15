
import {  IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateDocumentDto {
  @ApiProperty({ type: 'string' })
  
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  
  @IsNotEmpty()
  readonly filedata: Express.Multer.File; 
  //data: string; 
}