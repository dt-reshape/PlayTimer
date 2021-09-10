import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('achievement')
export class AchievementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  condition: string;
}
