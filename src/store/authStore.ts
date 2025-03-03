import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, AuthError, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Record<string, any>) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize auth state
  const initializeAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ 
        user: session?.user ?? null,
        session: session,
        loading: false,
        error: null,
        initialized: true
      });
    } catch (error) {
      set({ 
        user: null,
        session: null,
        loading: false,
        error: (error as Error).message,
        initialized: true
      });
    }
  };

  // Call initialize immediately
  initializeAuth();

  // Set up auth state listener
  supabase.auth.onAuthStateChange((_event, session) => {
    set({ 
      user: session?.user ?? null,
      session: session,
      loading: false,
      error: null,
      initialized: true
    });
  });

  return {
    user: null,
    session: null,
    loading: true,
    error: null,
    initialized: false,

    signIn: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null });
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        set({ 
          user: data.user,
          session: data.session,
          error: null
        });
      } catch (error) {
        const authError = error as AuthError;
        set({ error: authError.message });
        throw authError;
      } finally {
        set({ loading: false });
      }
    },

    signUp: async (email: string, password: string, userData: Record<string, any>) => {
      try {
        set({ loading: true, error: null });
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: userData,
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (error) throw error;

        set({ 
          user: data.user,
          session: data.session,
          error: null
        });
      } catch (error) {
        const authError = error as AuthError;
        set({ error: authError.message });
        throw authError;
      } finally {
        set({ loading: false });
      }
    },

    signOut: async () => {
      try {
        set({ loading: true, error: null });
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        set({ 
          user: null,
          session: null,
          error: null
        });
      } catch (error) {
        const authError = error as AuthError;
        set({ error: authError.message });
        throw authError;
      } finally {
        set({ loading: false });
      }
    },

    signInWithGoogle: async () => {
      try {
        set({ loading: true, error: null });
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        });
        
        if (error) throw error;
      } catch (error) {
        const authError = error as AuthError;
        set({ error: authError.message });
        throw authError;
      } finally {
        set({ loading: false });
      }
    },

    clearError: () => set({ error: null })
  };
});

// Export a type-safe hook
export type AuthStore = ReturnType<typeof useAuthStore>;