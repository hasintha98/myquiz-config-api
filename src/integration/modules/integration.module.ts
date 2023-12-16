import { Module } from '@nestjs/common';
import { IntegrationController } from '../controllers/integration.controller';
import { IntegrationService } from '../services/integration.service';
import { MyLogger } from 'src/logger/logger.service';
import { UserService } from 'src/user/services/user.service';
import { QuestionsService } from 'src/questions/services/questions.service';

@Module({
  imports: [],
  controllers: [IntegrationController],
  providers: [IntegrationService, MyLogger, UserService, QuestionsService],
})
export class IntegrationModule {}
