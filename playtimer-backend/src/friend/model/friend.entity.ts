import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity('friend')
export class FriendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  firstUser: UserEntity;
  secondUser: UserEntity;
}
