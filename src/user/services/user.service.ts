import { Injectable } from '@nestjs/common';
import { RegiterUserRequestDTO } from '../dto/RegisterUser.request.dto';
import { USER_URL } from 'src/config/const';
import axios from 'axios';
import { MyLogger } from 'src/logger/logger.service';
import { AppService } from 'src/app.service';
import { MobileDTO } from '../dto/Mobile.dto';

@Injectable()
export class UserService {
  constructor(private readonly logger: MyLogger) {}

  async createUser(data: RegiterUserRequestDTO) {
    try {
      console.log(USER_URL)
      await axios(USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {data},
      });

      this.logger.log('CREATE USER|' + data.senderMask, AppService.name);
    } catch (e) {
      this.logger.error(
        'ERROR CREATE USER|' + JSON.stringify(e),
        AppService.name,
      );
    }
  }

  async getUser(data: MobileDTO) {
    try {
      const user = await axios(USER_URL + `?filters[senderMask][$eq]=${data.senderMask}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      return user.data.data[0];
    } catch (e) {
      this.logger.error(
        'ERROR GETTING USER|' + JSON.stringify(e),
        AppService.name,
      );
    }
  }

  async updateUserAnsweredQuestions(senderMask: string, questionId: number) {
    try {
      let user = await this.getUser({ senderMask });
    
      //TODO: need to implement to update the answered questions in user

      return user.data;
    } catch (e) {
      this.logger.error(
        'ERROR GETTING USER|' + JSON.stringify(e),
        AppService.name,
      );
    }
  }

  async removeUser(data: MobileDTO) {
    try {
      await axios(USER_URL + `?filters[senderMask][$eq]=${data.senderMask}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data,
      });

      this.logger.log('DELETED USER|' + data.senderMask, AppService.name);
    } catch (e) {
      this.logger.error(
        'ERROR DELETE USER|' + JSON.stringify(e),
        AppService.name,
      );
    }
  }

  async updateUser(data: any) {
    try {
      await axios(USER_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data,
      });

      this.logger.log('UPDATE USER|' + data.mobile, AppService.name);
    } catch (e) {
      this.logger.error(
        'ERROR DELETE USER|' + JSON.stringify(e),
        AppService.name,
      );
    }
  }
}
