import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AchievementEntity } from '../../achievement/models/achievement.entity';
import { TimeLogEntity } from '../../time-log/models/time-log.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column({ select: false })
  password: string;

  @Column({
    name: 'registration_date',
  })
  registrationDate: Date;

  @Column({
    name: 'profile_pic',
  })
  profilePic: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => AchievementEntity)
  @JoinTable({
    name: 'user_achievement',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'achievement_id' },
  })
  achievements: AchievementEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'friend',
    joinColumn: { name: 'first_user_id' },
    inverseJoinColumn: { name: 'second_user_id' },
  })
  friends: UserEntity[];

  @OneToMany(() => TimeLogEntity, (timeLog) => timeLog.user)
  timeLogs: TimeLogEntity[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
