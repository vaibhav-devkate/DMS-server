import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseFilePipeBuilder, UploadedFile, Res } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('filedata'))
  @ApiBody({type: CreateDocumentDto,})
  uploadPdf(
    @Body()createDocumentDto: CreateDocumentDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: '.(pdf)',
      })
      .addMaxSizeValidator({
        maxSize:1048576 * 100,
      })
      .build({

      })

    )
    filedata : Express.Multer.File

  ){
    console.log(filedata);
    return this.documentsService.uploadPdf(createDocumentDto,filedata);
  }



  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.documentsService.findOne(+id);
  // }

  @Get(':id')
 async downloadFile(@Param('id') id: string, @Res() res: Response) {
   const file = this.documentsService.findOne(+id);

   res.setHeader('Content-Type', 'application/pdf');
   res.setHeader('Content-Disposition',`attachment;filename=${(await file).name}`);
   res.send((await file).filedata);
  }
  







  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('filedata'))
  @ApiBody({type: UpdateDocumentDto,})
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto,
  @UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: '.(pdf)',
    })
    .addMaxSizeValidator({
      maxSize:1048576 * 100,
    })
    .build({

    })

  )
  filedata : Express.Multer.File
  ) {
    console.log(filedata);
    return this.documentsService.update(+id, updateDocumentDto,filedata);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.documentsService.remove(+id);
  }
}
