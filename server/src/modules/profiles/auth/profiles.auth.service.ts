import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nLanguageService } from "src/modules/language/language.service";
import { SupabaseService } from "src/modules/supabase/supabase.service";
import { Repository } from "typeorm";
import { ForgotPasswordDto, SignUpProfileDto } from "../dto/auth-profile.dto";
import { Profile } from "../entities/profile.entity";

@Injectable()
export class ProfilesAuthService {
  constructor(
    @InjectRepository(Profile) private Profiles: Repository<Profile>,
    private readonly supabaseService: SupabaseService,
    private readonly lang: I18nLanguageService,
  ) {}

  async signUp(signUpData: SignUpProfileDto) {
    const { email, password, username, display_name } = signUpData;

    const foundUsername = await this.Profiles.findOneBy({ username });
    if (foundUsername) {
      throw new BadRequestException(
        this.lang.message("auth.signUp.usernameTaken"),
      );
    }

    // supabase user
    const supabaseClient = this.supabaseService.getClient();
    const { data: authData, error: authError } =
      await supabaseClient.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
        user_metadata: {
          username,
        },
      });

    if (authError || !authData.user?.id) {
      throw new BadRequestException(
        this.lang.message(`auth.signUp.${authError?.code || "unknownSignUp"}`),
      );
    }

    const userId = authData.user.id;

    // db profile
    let newProfile: Profile;
    try {
      const newProfileEntity = this.Profiles.create({
        id: userId,
        username,
        display_name,
        disabled: false,
      });
      newProfile = await this.Profiles.save(newProfileEntity);
    } catch (err) {
      // cleanup if profile entity saving failed
      await supabaseClient.auth.admin.deleteUser(userId); // cleanup
      throw err;
    }

    // TODO: change the email invite logic (change the smtp provider)
    // email verification
    const { data: emailData, error: emailError } =
      await supabaseClient.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.CLIENT_URL}/auth/callback`,
      });

    if (emailError) {
      throw new BadRequestException(
        `Email Error: ${emailError?.message || "unknown"}`,
      );
    }

    return {
      user: {
        username: newProfile.username,
        created_at: newProfile.created_at,
      },
      message:
        "Account created successfully. Please check your email to verify your account.",
    };
  }

  async forgotPassword(forgotPasswordData: ForgotPasswordDto) {
    const {email} = forgotPasswordData;

    const foundUser = this.Profiles.findOneBy({
      
    })
  }
}
