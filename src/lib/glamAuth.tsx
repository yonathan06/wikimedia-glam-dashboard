import React from 'react';
import { login as fetchLogin } from '../api/app';
import decodeJwt from 'jwt-decode';
import isAfter from 'date-fns/isAfter';

export interface CurrentUser {
  token: string;
  glam_id: string;
  username: string;
}

interface GlamAuthContextValue {
  currentUser?: CurrentUser;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const GlamAuthContext = React.createContext<GlamAuthContextValue>({
  login: async (username: string, password: string) => {},
  logout: async () => {},
});

const localStorageKey = 'currentUser';

export const AuthProvider: React.FC<{ glamId: string }> = ({
  children,
  glamId,
}) => {
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>();
  const checkTokenIntervalRef = React.useRef<any>();
  React.useEffect(() => {
    try {
      const currentUser = JSON.parse(
        localStorage.getItem(localStorageKey) as string
      );
      const { exp } = decodeJwt(currentUser.token);
      if (isAfter(new Date(), new Date(exp * 1000))) {
        throw new Error('Expired token in local storage');
      }
      setCurrentUser(currentUser);
    } catch (err) {
      localStorage.removeItem(localStorageKey);
    }
  }, []);
  const login = React.useCallback(
    async (username, password) => {
      const { token } = await fetchLogin(glamId, username, password);
      const currentUser = {
        glam_id: glamId,
        username,
        token,
      };
      setCurrentUser(currentUser);
      localStorage.setItem(localStorageKey, JSON.stringify(currentUser));
    },
    [glamId]
  );
  const logout = React.useCallback(async () => {
    setCurrentUser(undefined);
    localStorage.removeItem(localStorageKey);
  }, []);
  React.useEffect(() => {
    function clearTokenInterval() {
      clearInterval(checkTokenIntervalRef.current);
      checkTokenIntervalRef.current = null;
    }
    if (currentUser) {
      if (!checkTokenIntervalRef.current) {
        checkTokenIntervalRef.current = setInterval(() => {
          const { exp } = decodeJwt(currentUser.token);
          if (isAfter(new Date(), new Date(exp * 1000))) {
            logout();
            clearTokenInterval();
          }
        }, 1000 * 30);
      }
    } else if (checkTokenIntervalRef.current) {
      clearTokenInterval();
    }
  }, [currentUser, checkTokenIntervalRef, logout]);

  const contextValue: GlamAuthContextValue = {
    currentUser,
    login,
    logout,
  };

  return (
    <GlamAuthContext.Provider value={contextValue}>
      {children}
    </GlamAuthContext.Provider>
  );
};
