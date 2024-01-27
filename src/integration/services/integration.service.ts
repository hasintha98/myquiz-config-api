import { Injectable } from '@nestjs/common';
import { RegiterUserRequestDTO } from '../dto/RegisterUser.request.dto';
import {
  MSPACE_APPID,
  MSPACE_APPKEY,
  MSPACE_OTP_URL,
  MSPACE_SMS_CLIENT_ID,
  MSPACE_SMS_URL,
} from 'src/config/const';
import axios from 'axios';
import {
  generateStringHash,
  mobileGeneratorWithOutPlus,
} from 'src/config/common';
import { MyLogger } from 'src/logger/logger.service';
import { AppService } from 'src/app.service';
import { UserService } from 'src/user/services/user.service';
import { MobileDTO } from '../dto/Mobile.dto';
import { QuestionsService } from 'src/questions/services/questions.service';
import { VerifyAnswerRequestDTO } from '../dto/VerifyAnswers.request';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly logger: MyLogger,
    private userService: UserService,
    private questionService: QuestionsService,
  ) {}

  async registerUser(userDetails: RegiterUserRequestDTO) {
    try {

      const createUser = {
        senderMask: userDetails.senderMask,
        serviceProvider: 'mobitel',
        cycle: 0,
      };

      const response = await this.userService.createUser(createUser);

      await this.sendQuestion({ senderMask: userDetails.senderMask });

      this.logger.log(
        `REGISTERED|${userDetails.senderMask}|` + JSON.stringify(response),
        AppService.name,
      );
      return response;
    } catch (err) {
      this.logger.error(
        'ERROR REGISTER|' + JSON.stringify(err?.response),
        AppService.name,
      );
    }
  }

  async sendQuestion(mobileDto: MobileDTO) {
    try {
      const user = await this.userService.getUser(mobileDto);
      const questionDetails = await this.questionService.getRandomQuestion([]);

      //TODO: Need to implement to send question here

      const response = await axios(MSPACE_SMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-ibm-client-id': MSPACE_SMS_CLIENT_ID,
        },
        data: {
          message: `
          ${questionDetails.attributes.question}
          
          
          ${questionDetails.attributes.answer_1}

          ${questionDetails.attributes.answer_2}

          ${questionDetails.attributes.answer_3}

          `,
          characterEncoding: 'ascii',
          appID: MSPACE_APPID,
          appKey: MSPACE_APPKEY,
          recipientMask: user.attributes.senderMask,
        },
      });

      this.logger.log(
        `SENT QUESTION|${user.mobile}|` + JSON.stringify(response?.data),
        AppService.name,
      );
      return response;
    } catch (err) {
      this.logger.error(
        'ERROR SENDING QUESTIONS|' + JSON.stringify(err?.response),
        AppService.name,
      );
    }
  }

  async unregisterUser(userDetails: MobileDTO) {
    try {

      await this.userService.removeUser(userDetails);
      this.logger.log(
        `UNREGISTERED|${userDetails.senderMask}|` + JSON.stringify(userDetails?.senderMask),
        AppService.name,
      );
      return userDetails;
    } catch (err) {
      this.logger.error(
        'ERROR REGISTER|' + JSON.stringify(err?.response),
        AppService.name,
      );
    }
  }

  async answerVerification(answerDataDTO: VerifyAnswerRequestDTO) {
    try {
      const verification = await this.questionService.verifyAnswer(
        answerDataDTO.questionId,
        answerDataDTO.answerNo,
      );

      await this.userService.updateUserAnsweredQuestions(
        answerDataDTO.mobile,
        answerDataDTO.questionId,
      );

      return verification;
    } catch (err) {
      this.logger.error(
        'ERROR REGISTER|' + JSON.stringify(err?.response),
        AppService.name,
      );
    }
  }
}
