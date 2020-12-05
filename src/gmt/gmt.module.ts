import { Module } from '@nestjs/common';
import { GmtService } from './gmt/gmt.service';
import { GmtController } from './gmt/gmt.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Gmt} from "./gmt.entity";
import {GmtRepository} from "./gmt/gmt.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([GmtRepository]),
  ],
  providers: [GmtService],
  controllers: [GmtController]
})
export class GmtModule {}
