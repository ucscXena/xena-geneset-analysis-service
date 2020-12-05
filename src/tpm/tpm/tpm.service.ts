import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {Tpm} from "../tpm.entity";

@Injectable()
export class TpmService {

  constructor(
    @InjectRepository(Tpm)
    private tpmRepository: Repository<Tpm>,
  ) { }

  async  findAll(): Promise<Tpm[]> {
    return await this.tpmRepository.find();
  }

  async  create(tpm: Tpm): Promise<Tpm> {
    return await this.tpmRepository.save(tpm);
  }

  async update(tpm: Tpm): Promise<UpdateResult> {
    return await this.tpmRepository.update(tpm.id, tpm);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.tpmRepository.delete(id);
  }
}
