import { Module } from '@nestjs/common';
import { GmtService } from './gmt/gmt.service';
import { GmtController } from './gmt/gmt.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Gmt} from "./gmt.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Gmt]),
  ],
  providers: [GmtService],
  controllers: [GmtController]
})
export class GmtModule {}
