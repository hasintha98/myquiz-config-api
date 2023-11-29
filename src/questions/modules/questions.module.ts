import { Module } from '@nestjs/common';
import { QuestionsService } from '../services/questions.service';
import { QuestionsController } from '../controllers/questions.controller';
import { MyLogger } from 'src/logger/logger.service';

@Module({
  imports: [],
  controllers: [QuestionsController],
  providers: [QuestionsService, MyLogger],
})
export class QuestionsModule {}
