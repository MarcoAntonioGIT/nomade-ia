import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { AuthState, AppError } from '@/types';

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AppError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AppError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AppError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );

        // Check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial session:', currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signUp = useCallback(async (
    email: string, 
    password: string, 
    fullName: string
  ): Promise<{ error: AppError | null }> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return { 
          error: {
            code: 'SIGNUP_ERROR',
            message: error.message,
            timestamp: new Date().toISOString(),
          }
        };
      }

      // If email confirmation is disabled, the user will be logged in immediately
      if (data.user && !data.user.email_confirmed_at) {
        console.log('User created, awaiting email confirmation');
      }

      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        error: {
          code: 'NETWORK_ERROR',
          message: 'Erro de conexão',
          timestamp: new Date().toISOString(),
        }
      };
    }
  }, []);

  const signIn = useCallback(async (
    email: string, 
    password: string
  ): Promise<{ error: AppError | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        return { 
          error: {
            code: 'SIGNIN_ERROR',
            message: error.message,
            timestamp: new Date().toISOString(),
          }
        };
      }

      console.log('User signed in:', data.user?.email);
      return { error: null };
    } catch (error) {
      console.error('Signin error:', error);
      return { 
        error: {
          code: 'NETWORK_ERROR',
          message: 'Erro de conexão',
          timestamp: new Date().toISOString(),
        }
      };
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Signout error:', error);
      }
    } catch (error) {
      console.error('Signout error:', error);
    }
  }, []);

  const resetPassword = useCallback(async (
    email: string
  ): Promise<{ error: AppError | null }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        return { 
          error: {
            code: 'PASSWORD_RESET_ERROR',
            message: error.message,
            timestamp: new Date().toISOString(),
          }
        };
      }

      return { error: null };
    } catch (error) {
      console.error('Password reset error:', error);
      return { 
        error: {
          code: 'NETWORK_ERROR',
          message: 'Erro de conexão',
          timestamp: new Date().toISOString(),
        }
      };
    }
  }, []);

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
