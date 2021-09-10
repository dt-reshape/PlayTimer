import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementModule } from './achievement/achievement.module';
import { FriendModule } from './friend/friend.module';
import { TimeLogModule } from './time-log/time-log.module';
import { GameModule } from './game/game.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AuthModule,
    UserModule,
    AchievementModule,
    FriendModule,
    TimeLogModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
