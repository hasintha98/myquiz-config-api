import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegiterUserRequestDTO {

    @IsString()
    mobile: string;

    @IsString()
    senderMask: string;

    @IsOptional()
    @IsNotEmpty()
    cycle: Number;

    @IsOptional()
    @IsNotEmpty()
    serviceProvider: string;

}

