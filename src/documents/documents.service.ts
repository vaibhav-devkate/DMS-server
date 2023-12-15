import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async uploadPdf(createDocumentDto: CreateDocumentDto,filedata: Express.Multer.File) {
    try {
     const buffer = filedata.buffer;
     
     const fileCreateInput = {
       name: createDocumentDto.name,
       filedata:  buffer,
     };
     const result = await this.prisma.file.create({
       data: fileCreateInput,
     });

   
   return {
     message: 'PDF file uploaded and stored in the database successfully',
     pdfFileId: result.id, 
   };
 } catch (error) {
   console.log(error);
   throw new Error('Failed to store PDF in the database');
 }
}



  async findAll() {
    console.log('This action returns all documents');    
    return await this.prisma.file.findMany();
  }

  async findOne(id: number) {
    console.log(`This action returns a #${id} document`);
    return await this.prisma.file.findUnique({ where: { id } });
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto,filedata: Express.Multer.File) {

    try {
      const buffer = filedata.buffer;
      
      const fileCreateInput = {
        name: updateDocumentDto.name,
        filedata:  buffer,
      };
      const result = await this.prisma.file.update({
        where: { id },
        data: fileCreateInput,
      });
      return {
        message: 'PDF file uploaded and updated in the database successfully',
        pdfFileId: result.id, 
      };

     }
    catch (error) {
    console.log(error);
    throw new Error('Failed to update PDF in the database');
    }

   
  }

  async remove(id: number) {

    const result = await this.prisma.file.delete({ where: { id } });
      
    console.log(`This action removes a #${id} document`);
    return {
      message: 'PDF file removed from the database successfully',
      pdfFileId: result.id, 
    };

  }
}
