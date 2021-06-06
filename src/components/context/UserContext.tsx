import { createContext, FC, useContext, useState } from "react";

interface IUserContext {
  isAuth: boolean;
  login: ({
    username,
    password,
  }: {
    username: string;
    password?: string;
  }) => void;
  logout: () => void;
}

const initialContext: IUserContext = {
  isAuth: false,
  login: ({
    username,
    password,
  }: {
    username: string;
    password?: string;
  }) => {},
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

  const login = ({
    username,
    password,
  }: {
    username: string;
    password?: string;
  }) => {
    sessionStorage.setItem("authenticatedUser", username);
    setState({ isAuth: true });
  };

  const logout = () => {
    sessionStorage.removeItem("authenticatedUser");
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
