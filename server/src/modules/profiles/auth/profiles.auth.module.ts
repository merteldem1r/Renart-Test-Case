import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../entities/profile.entity";
import { ProfilesAuthController } from "./profiles.auth.controller";
import { ProfilesAuthService } from "./profiles.auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]), // Register Profile repository
  ],
  providers: [ProfilesAuthService],
  controllers: [ProfilesAuthController],
})
export class ProfileAuthModule {}
