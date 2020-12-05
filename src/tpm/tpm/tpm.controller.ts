import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TpmService} from "./tpm.service";
import {Tpm} from "../tpm.entity";

@Controller('tpm')
export class TpmController {

  constructor(private tpmService: TpmService){}

  @Get()
  index(): Promise<Tpm[]> {
    return this.tpmService.findAll();
  }

  @Post('create')
  async create(@Body() analysisResultData: Tpm): Promise<any> {
    return this.tpmService.create(analysisResultData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() tpmData: Tpm): Promise<any> {
    tpmData.id = Number(id);
    console.log('Update #' + tpmData.id)
    return this.tpmService.update(tpmData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.tpmService.delete(id);
  }

}
