import type { AuthError, Session } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { SignInForm } from "../../pages/auth/models";
import { supabase } from "../../supabaseClient";

interface AuthResponse {
  success: boolean;
  error?: string | AuthError;
  errorCode?: string;
  data?: any;
}

interface AuthContextType {
  signInUser: (vaues: SignInForm) => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;
  session: Session | null | undefined;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  // Sign in
  const signInUser = async (values: SignInForm): Promise<AuthResponse> => {
    try {
      const { email, password } = values;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Handle Supabase error explicitly
      if (error) {
        return { success: false, error: error.message, errorCode: error.code }; // Return the error
      }

      return { success: true, data }; // Return the user data
    } catch (error) {
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign out
  const signOut = async (): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          error: error.message,
          errorCode: error.code,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ signInUser, session, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
