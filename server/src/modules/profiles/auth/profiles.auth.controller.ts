import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SignUpProfileDto } from "../dto/auth-profile.dto";
import { ProfilesAuthService } from "./profiles.auth.service";

@Controller("user")
export class ProfilesAuthController {
  constructor(private readonly profileAuthService: ProfilesAuthService) {}

  // @ApiOperation({
  //   tags: ["End User"],
  //   description: "Sign In",
  // })
  // @Post("signin")
  // signIn(@Body() signInData: SignInProfileDto) {
  //   return this.profileAuthService.signIn(signInData);
  // }

  @ApiOperation({
    tags: ["End User"],
    description: "Sign Up",
  })
  @Post("signup")
  signUp(@Body() signUpData: SignUpProfileDto) {
    return this.profileAuthService.signUp(signUpData);
  }
}
