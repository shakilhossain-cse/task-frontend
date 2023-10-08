import React, { useEffect } from "react";
import initialState, { IAuthState, User } from "./initialState";
import authReducer from "./reducer";
import { getFromLocalStorage, setLocalStorage } from "../../utils/localStorage";

interface AuthContextType {
  signUp: (payload: IAuthState, callback?: VoidFunction) => void;
  signIn: (payload: IAuthState, callback?: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext({} as IAuthState);
const AuthActionContext = React.createContext({} as AuthContextType);

const AuthProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [state, dispatch] = React.useReducer(
    authReducer,
    initialState,
    (initial) => {
      if (typeof localStorage === "undefined") return initial;

      return (
        {
          user: getFromLocalStorage("auth") as User,
          token: getFromLocalStorage("token") as string ,
        } as IAuthState|| initial
      );
    }
  );

  useEffect(() => {
    getFromLocalStorage("auth");

    setLocalStorage("auth", state.user);
    setLocalStorage("token", state.token);
  }, [state]);

  function signUp(payload: IAuthState, cb: VoidFunction | undefined) {
    dispatch({ type: "register", payload });
    cb && cb();
  }
  function signIn(payload: IAuthState, cb: VoidFunction | undefined) {
    dispatch({ type: "login", payload });
    cb && cb();
  }

  function signOut(cb: VoidFunction) {
    dispatch({ type: "logout" });
    cb();
  }

  const actions = {
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthActionContext.Provider value={actions}>
      <AuthContext.Provider value={state}>
        {props.children}
      </AuthContext.Provider>
    </AuthActionContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
export const useAuthActions = () => React.useContext(AuthActionContext);
export default AuthProvider;
