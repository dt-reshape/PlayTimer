import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';
import { GameEntity } from '../../game/models/game.entity';

@Entity('time_log')
export class TimeLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.timeLogs)
  user: UserEntity;

  @ManyToOne(() => GameEntity)
  game: GameEntity;

  @Column()
  hours: number;

  @Column()
  date: Date;
}
