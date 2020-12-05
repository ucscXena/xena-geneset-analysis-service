import { Injectable } from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Gmt} from "../gmt.entity";

@Injectable()
export class GmtService {

  constructor(
    @InjectRepository(Gmt)
    public gmtRepository: Repository<Gmt>,
  ) { }

  async  findAll(): Promise<Gmt[]> {
    console.log("setting reopsitory? ",this.gmtRepository)
    return await this.gmtRepository.find();
  }

  async  create(gmt: Gmt): Promise<Gmt> {
    return await this.gmtRepository.save(gmt);
  }

  async update(gmt: Gmt): Promise<UpdateResult> {
    return await this.gmtRepository.update(gmt.id, gmt);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.gmtRepository.delete(id);
  }
}
