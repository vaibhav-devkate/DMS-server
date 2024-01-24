import { Injectable } from '@nestjs/common';
import { CreateDocVersionDto } from './dto/create-doc-version.dto';
import { UpdateDocVersionDto } from './dto/update-doc-version.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { RelatedDocumentDto } from './dto/related-document.dto'
//import { version } from 'os';

@Injectable()
export class DocVersionService {
  constructor(private prisma: PrismaService) {}

  async uploadPdf(createDocVersionDto: CreateDocVersionDto,filedata: Express.Multer.File){
    try {
    
      const result = await this.prisma.pdf.create({
        data: {
          pdfname:createDocVersionDto.pdfname,
          pdfdata:filedata.buffer,
          pdftype:createDocVersionDto.pdftype,
          version:Number(createDocVersionDto.version),
        },
      });
      console.log(createDocVersionDto.selectedOptions)
      const obj = JSON.parse(createDocVersionDto.selectedOptions);
      console.log(obj)
      for (const pdfId of obj) {
      
       console.log(pdfId)

        await this.prisma.relatedDocument.create({
          data: {
            maindocid: result.id,
            pdfid: pdfId,
        }
      });
      }

       return {
      message: 'PDF file uploaded and stored in the database successfully',
      pdfFileId: result.id,
     
    };
  } catch (error) {
    console.log('error>>>',error);
    throw new Error('Failed to store PDF in the database');
  }

    
  }



  
  async findOne(id: number) {
     
      return await this.prisma.pdf.findUnique({ where: { id } });
    }


    async latestVersion(id: number) {
     
      return await this.prisma.pdf.findUnique({ where: { id }
        ,
        select:{
          
          version: true,
          
        } }); 
    }

    async findNamefromId(id: number){
return this.prisma.pdf.findUnique({ where: { id: id } ,select:{ pdfname: true, id:true }});
    }

  async findAll() {
    
   
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
    
    // console.log(`This action returns a #${id} document`);
    return await this.prisma.version.findMany({ where: { fileid: id  },
      select:{
        id:true,
        pdfname: true,
        version: true,
        fileid:true
      } });
  }

  async relatedDoc(id: number) {
    
    // console.log(`This action returns a #${id} document`);
    return await this.prisma.relatedDocument.findMany({ where: { maindocid: id  },
      select:{
        pdfid: true,
        
      } });
  }

  async findOneversionsData(documentId: number,versionId:number) {
    
    // console.log(`This action returns a #${id} document`);
    return await this.prisma.version.findFirst({ where: {
      AND: [
        { fileid: documentId },
        { version: versionId },
      ]
    },
       });
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
