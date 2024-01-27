import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegiterUserRequestDTO {


    @IsOptional()
    @IsString()
    senderMask: string;

    @IsOptional()
    @IsNotEmpty()
    cycle: Number;

    @IsOptional()
    @IsNotEmpty()
    serviceProvider: string;

}

