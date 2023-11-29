import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegiterUserRequestDTO {

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsOptional()
    @IsNotEmpty()
    ref: string;

    @IsOptional()
    @IsNotEmpty()
    cycle: Number;

    @IsOptional()
    @IsNotEmpty()
    serviceProvider: string;

}

