import {
  Body,
    Controller,
    Get,
    Post
  } from '@nestjs/common';
import { IntegrationService } from '../services/integration.service';
import { RegiterUserRequestDTO } from '../dto/RegisterUser.request.dto';
import { VerifyAnswerRequestDTO } from '../dto/VerifyAnswers.request';

  @Controller('integration')
  export class IntegrationController {
    constructor(private readonly integrationService: IntegrationService) {}
  
    @Post('/user/register')
    registerUser(@Body() userDetails: RegiterUserRequestDTO) {
      return this.integrationService.registerUser(userDetails);
    }

     
    @Post('/user/unregister')
    unregisterUser(@Body() userDetails: RegiterUserRequestDTO) {
      return this.integrationService.unregisterUser(userDetails);
    }


    @Post('/user/answer/verify')
    verifyAnswersByUser(@Body() answerRequestDTO: VerifyAnswerRequestDTO) {
      return this.integrationService.answerVerification(answerRequestDTO);
    }
  
  
  }
  