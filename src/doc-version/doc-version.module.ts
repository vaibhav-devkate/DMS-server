import { Module } from '@nestjs/common';
import { DocVersionService } from './doc-version.service';
import { DocVersionController } from './doc-version.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DocVersionController],
  providers: [DocVersionService],
  imports:[PrismaModule]
})
export class DocVersionModule {}
