import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {GmtService} from "./gmt.service";
import {Gmt} from "../gmt.entity";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Gmt)
export class GmtRepository extends Repository<Gmt>{}

