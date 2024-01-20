import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUrlDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  originalUrl?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  shortUrl?: string;
}
