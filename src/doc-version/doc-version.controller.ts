import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder } from '@nestjs/common';
import { DocVersionService } from './doc-version.service';
import { CreateDocVersionDto } from './dto/create-doc-version.dto';
import { UpdateDocVersionDto } from './dto/update-doc-version.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
//import { Response } from 'express';

@Controller('doc-version')
export class DocVersionController {
  constructor(private readonly docVersionService: DocVersionService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('pdfdata'))
  @ApiBody({type: CreateDocVersionDto,})
  uploadPdf(
    @Body()createDocVersionDto: CreateDocVersionDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: '.(pdf)',
      })
      .addMaxSizeValidator({
        maxSize:1048576 * 10000,
      })
      .build({

      })

    )
    pdfdata : Express.Multer.File

  )
  {
    
    return this.docVersionService.uploadPdf(createDocVersionDto,pdfdata);
  }


  // @Get(':id')
  // async downloadFile(@Param('id') id: string, @Res() res: Response) {
  //   const file = this.docVersionService.findOne(+id) ;
 
  //   res.setHeader('Content-Type', 'application/pdf');
  //   res.setHeader('Content-Disposition',`attachment;filename=${(await file).pdfname}`);
  //   res.send((await file).pdfdata);
  //  }











  @Get('')
  findAll() {
    return this.docVersionService.findAll();
  }


  ///revision
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('pdfdata'))
  @ApiBody({type: UpdateDocVersionDto,})
  update(
    @Param('id') id: string,
    @Body()updateDocVersionDto: UpdateDocVersionDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: '.(pdf)',
      })
      .addMaxSizeValidator({
        maxSize:1048576 * 10000,
      })
      .build({

      })

    )
    pdfdata : Express.Multer.File

  )
  {
    return this.docVersionService.update(+id, updateDocVersionDto,pdfdata);
  }

  // update(@Param('id') id: string, @Body() updateDocVersionDto: UpdateDocVersionDto) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docVersionService.remove(+id);
  }
}
