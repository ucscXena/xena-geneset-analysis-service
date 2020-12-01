import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class AnalysisResults {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  geneset: string;

  @Column()
  cohort: string;

  @Column()
  result: string;
}
