export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthHashParams {
  // Auth Verification
  access_token?: string;
  expires_at?: string;
  expires_in?: string;
  refresh_token?: string;
  token_type?: string;
  type?: string;

  // Error
  error: string;
  error_code: string;
  error_description: string;
}
