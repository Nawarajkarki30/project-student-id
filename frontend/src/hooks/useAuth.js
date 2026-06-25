import { useAuthStore } from "../store/authStore";

// Custom hook: gives components a clean interface to auth state,
// without each component needing to know the store's internal shape
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    role: user?.role || null,
    isAuthenticated: !!token,
    isLoading,
    error,
    login,
    logout,
  };
}