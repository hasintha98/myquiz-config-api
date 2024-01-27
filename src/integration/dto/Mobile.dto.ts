import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MobileDTO {

    @IsString()
    mobile: string;

    @IsString()
    senderMask: string;
}

