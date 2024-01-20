import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUrlDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  id?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  clickCount?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  originalUrl?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  shortUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  userId?: string;
}
