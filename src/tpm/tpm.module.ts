import { Module } from '@nestjs/common';
import { TpmService } from './tpm/tpm.service';
import { TpmController } from './tpm/tpm.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tpm} from "./tpm.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Tpm]),
  ],
  providers: [TpmService],
  controllers: [TpmController]
})
export class TpmModule {}
