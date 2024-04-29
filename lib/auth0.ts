import {
  handleAuth,
  handleLogin,
  handleLogout,
  handleCallback,
  getSession,
} from "@auth0/nextjs-auth0";

export const auth = handleAuth();
export const login = handleLogin();
export const logout = handleLogout();
export const callback = handleCallback();
export const session = getSession;
