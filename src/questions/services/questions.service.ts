import { Injectable } from '@nestjs/common';
import { RegiterUserRequestDTO } from '../dto/RegisterUser.request.dto';
import { QUESTIONS_URL } from 'src/config/const';
import axios from 'axios';
import { MyLogger } from 'src/logger/logger.service';
import { AppService } from 'src/app.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly logger: MyLogger) {}

  async getRandomQuestion(except: []) {
    try {
      const response = await axios(QUESTIONS_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return response.data.data[0];
    } catch (e) {
      this.logger.error(
        'ERROR GETTING QUESTIONS (RANDOM)|' + JSON.stringify(e),
        AppService.name,
      );
    }
  }

  async verifyAnswer(id: number, answerNo: number) {
    try {
      const response = await axios(QUESTIONS_URL + `/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const questionData = response.data.data[0];

      if (questionData.attributes.correctAnswer == `answer_${answerNo}`) {
        return {
          code: '00011',
          message: 'Answer is Correct!!',
        };
      }

      return {
        code: '00001',
        message: 'Answer is Not Correct!!',
      };
    } catch (e) {
      this.logger.error(
        'ERROR GETTING QUESTIONS |' + JSON.stringify(e),
        AppService.name,
      );
    }
  }
}
