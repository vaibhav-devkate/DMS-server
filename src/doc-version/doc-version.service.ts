import { Injectable } from '@nestjs/common';
import { CreateDocVersionDto } from './dto/create-doc-version.dto';
import { UpdateDocVersionDto } from './dto/update-doc-version.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocVersionService {
  constructor(private prisma: PrismaService) {}

  async uploadPdf(createDocVersionDto: CreateDocVersionDto,filedata: Express.Multer.File){
    try {
      const version = Number(createDocVersionDto.version);
      const result = await this.prisma.pdf.create({
        data: {
          pdfname:createDocVersionDto.pdfname,
          pdfdata:filedata.buffer,
          pdftype:createDocVersionDto.pdftype,
          version:version

        },
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

//   async uploadPdf(createDocVersionDto: CreateDocVersionDto,filedata: Express.Multer.File) : Promise<FileVersionDto[]>{
//     try {
//      const buffer = filedata.buffer;
//      const fileVersion = new createDocVersionDto.FileVersion();
//      fileVersion.pdfFileId = pdfFile.id;
//      const fileCreateInput = {
//        fileVersion= createDocVersionDto.fileVersions;
//      };
//      const result = await this.prisma.pdfFile.create({
//        data: fileCreateInput,
//      });

   
//    return {
//      message: 'PDF file uploaded and stored in the database successfully',
//      pdfFileId: result.id, 
//    };
//  } catch (error) {
//    console.log(error);
//    throw new Error('Failed to store PDF in the database');
//  }
// }

  // create(createDocVersionDto: CreateDocVersionDto) {
  //   return 'This action adds a new docVersion';
  // }


  // async findOne(id: number) {
  //   console.log(`This action returns a #${id} document`);
  //   return await this.prisma.pdf.findUnique({ where: { id } });
  // }

  async findAll() {
    
    console.log('This action returns all documents');    
    return await this.prisma.pdf.findMany(
      {
        select:{
          id:true,
          pdfname: true,
          version: true,
        }
      }
    );
  }

  async findOneversions(id: number) {
    
    console.log(`This action returns a #${id} document`);
    return await this.prisma.version.findMany({ where: { fileid: id  } });
  }

  async update(id: number, updateDocVersionDto: UpdateDocVersionDto,filedata: Express.Multer.File) {
   
   try{
      const version = Number(updateDocVersionDto.version);

    const oldEntry = await this.prisma.pdf.findUnique({ where: { id :id } });
    await this.prisma.version.create({
      data: {
        fileid:id,
        pdfname:oldEntry.pdfname,
        pdfdata:oldEntry.pdfdata,
        pdftype:oldEntry.pdftype,
        version:oldEntry.version
      },
    });

    console.log(`This action updates a #${id} docVersion`);
  
    const result = await this.prisma.pdf.update({
      where: { id },
      data: {
        pdfname:updateDocVersionDto.pdfname,
        pdfdata:filedata.buffer,
        pdftype:updateDocVersionDto.pdftype,
        version:version

      },
    });
 

    return {
      message: 'PDF file uploaded and stored in the database successfully',
      pdfFileId: result.id,
     
    };
   }
   catch (error) {
    console.log(error);
    throw new Error('Failed to store Revision in the database');
  }
  }

  remove(id: number) {
    return `This action removes a #${id} docVersion`;
  }
}
