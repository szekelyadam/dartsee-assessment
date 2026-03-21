import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('game_players')
export class GamePlayer {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'integer' })
  game_id: number;

  @Column({ type: 'text', nullable: true })
  player_id: string;
}
