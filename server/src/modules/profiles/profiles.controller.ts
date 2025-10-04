import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/profile-auth.guard";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({
    tags: ["End User"],
    description: "Get My Profile",
  })
  @Get("me")
  getMe(@Req() req) {
    return {
      email: req.user.email,
      username: req.profile.username,
      display_name: req.profile.display_name,
      phone: req.profile.phone,
      phone_verified: req.profile.phone_verified,
      created_at: req.profile.created_at,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return;
  }
}
