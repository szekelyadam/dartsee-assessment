import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;
}
