import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class SignUpProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @Length(5, 12, { message: "Username must be between 5 and 12 characters" })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  display_name?: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
  })
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

// NOT USED (using client sign in via Supabase)
export class SignInProfileDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
