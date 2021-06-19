import { createContext, FC, useContext, useState } from "react";
import AuthenticationService from "../services/AuthenticationService";

interface IUserContext {
  isAuth: boolean;
  login: ({ username, token }: { username: string; token?: string }) => void;
  logout: () => void;
}

const initialContext: IUserContext = {
  isAuth: false,
  login: ({ username, token }: { username: string; token?: string }) => {},
  logout: () => {},
};

interface IState {
  isAuth: boolean;
}

const initialState: IState = {
  isAuth: false,
};

const UserContext = createContext<IUserContext>(initialContext);

export const UserProvider: FC = ({ children }) => {
  const [state, setState] = useState(initialState);

  const login = ({ username, token }: { username: string; token?: string }) => {
    AuthenticationService.registerSuccessfulLogin(username, token);
    setState({ isAuth: true });
  };

  const logout = () => {
    AuthenticationService.logout();
    setState({ isAuth: false });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => useContext(UserContext);
