
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gmt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /**
   * md5
   */
  @Column()
  hash: string;

  /**
   * data file / tsv
   */
  @Column()
  data: string;

}
