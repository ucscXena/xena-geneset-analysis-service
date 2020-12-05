import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {GmtService} from "./gmt.service";
import {Gmt} from "../gmt.entity";

@Controller('gmt')
export class GmtController {

  constructor(private gmtService: GmtService){}

  @Get()
  index(): Promise<Gmt[]> {
    return this.gmtService.findAll();
  }

  @Post('create')
  async create(@Body() gmtData: Gmt): Promise<any> {
    return this.gmtService.create(gmtData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() gmtData: Gmt): Promise<any> {
    gmtData.id = Number(id);
    console.log('Update #' + gmtData.id)
    return this.gmtService.update(gmtData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.gmtService.delete(id);
  }
}
