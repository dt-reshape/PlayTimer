import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';

@Module({
  imports: [],
  providers: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
