import {
  Body,
    Controller,
    Get,
  } from '@nestjs/common';

  @Controller('user')
  export class UserController {
    constructor() {}
  
    @Get('/check')
    registerUser() {
      return "trues"
    }

  }
  