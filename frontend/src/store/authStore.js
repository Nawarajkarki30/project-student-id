import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi } from "../api/authApi";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { id, name, email, role }
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await loginApi(email, password);
          set({ user: data.user, token: data.token, isLoading: false });
          return data.user; // so the LoginPage can redirect by role
        } catch (err) {
          const message = err.response?.data?.message || "Login failed";
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);