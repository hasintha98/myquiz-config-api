import { Module } from '@nestjs/common';
import { IntegrationModule } from './integration/modules/integration.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/modules/user.module';
import { QuestionsModule } from './questions/modules/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    IntegrationModule,
    UserModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
