import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegiterUserRequestDTO {

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsOptional()
    serverRef: string;

}

