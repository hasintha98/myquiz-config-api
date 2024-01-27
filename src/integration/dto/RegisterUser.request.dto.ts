import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegiterUserRequestDTO {

    @IsString()
    mobile: string;

    @IsString()
    senderMask: string;

    @IsOptional()
    shortCode: Number;

    

}

