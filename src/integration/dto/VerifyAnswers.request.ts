import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VerifyAnswerRequestDTO {

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    answerNo: number;

    @IsNotEmpty()
    questionId: number;


}

