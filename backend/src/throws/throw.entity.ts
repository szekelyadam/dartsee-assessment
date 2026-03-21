import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('throws')
export class Throw {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true })
  game_id: number;

  @Column({ type: 'text', nullable: true })
  player_id: string;

  @Column({ type: 'integer', nullable: true })
  score: number;

  @Column({ type: 'integer', nullable: true })
  modifier: number;

  @Column({ type: 'integer', nullable: true })
  x: number;

  @Column({ type: 'integer', nullable: true })
  y: number;
}
