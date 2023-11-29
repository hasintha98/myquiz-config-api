import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { MyLogger } from 'src/logger/logger.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, MyLogger],
})
export class UserModule {}
