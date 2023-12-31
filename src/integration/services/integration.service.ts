import { Injectable } from '@nestjs/common';
import { RegiterUserRequestDTO } from '../dto/RegisterUser.request.dto';
import {
  MSPACE_APPID,
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
      const response = await axios(MSPACE_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          applicationId: MSPACE_APPID,
          password: 'eea1ebf64d8eca14380a0da39aba9f8b',
          subscriberId: `tel:${mobileGeneratorWithOutPlus(userDetails.mobile)}`,
          applicationHash: generateStringHash(10),
          applicationMetaData: {
            client: 'MOBILEAPP',
            device: 'Samsung S8',
            os: 'Windows 10',
            appCode: 'https://mycricq.com',
          },
        },
      });

      const creatUser = {
        mobile: userDetails.mobile,
        serviceProvider: 'mobitel',
        cycle: 0,
        ref: userDetails.serverRef,
      };

      await this.userService.createUser(creatUser);

      await this.sendQuestion({ mobile: userDetails.mobile });

      this.logger.log(
        `REGISTERED|${userDetails.mobile}|` + JSON.stringify(response?.data),
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
          appID: '',
          appKey: '',
          recipientMask: `tel:${mobileGeneratorWithOutPlus(
            user.attributes.mobile,
          )}`,
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
      const response = await axios(MSPACE_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          applicationId: MSPACE_APPID,
          password: 'eea1ebf64d8eca14380a0da39aba9f8b',
          subscriberId: `tel:${mobileGeneratorWithOutPlus(userDetails.mobile)}`,
          applicationHash: generateStringHash(10),
          applicationMetaData: {
            client: 'MOBILEAPP',
            device: 'Samsung S8',
            os: 'Windows 10',
            appCode: 'https://mycricq.com',
          },
        },
      });

      this.userService.removeUser(userDetails);
      this.logger.log(
        `REGISTERED|${userDetails.mobile}|` + JSON.stringify(response?.data),
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
