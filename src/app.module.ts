import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DocumentsModule } from './documents/documents.module';
import { DocVersionModule } from './doc-version/doc-version.module';

@Module({
  imports: [PrismaModule, DocumentsModule, DocVersionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
