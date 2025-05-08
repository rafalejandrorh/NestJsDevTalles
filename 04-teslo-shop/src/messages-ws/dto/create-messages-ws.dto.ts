import { IsString, MinLength } from "class-validator";

export class CreateMessagesWsDto {
    @IsString()
    @MinLength(1)
    message: string;
}
