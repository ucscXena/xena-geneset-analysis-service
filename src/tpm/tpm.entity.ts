
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tpm{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cohort: string;

  /**
   * md5
   */
  @Column()
  url: string;

  /**
   * data file / tsv
   */
  @Column()
  data: string;

}
