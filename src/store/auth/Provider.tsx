import React, { useEffect } from "react";
import initialState, { IAuthState, User } from "./initialState";
import authReducer from "./reducer";
import { getFromLocalStorage, setLocalStorage } from "../../utils/localStorage";

interface AuthContextType {
  signUp: (payload: User, callback?: VoidFunction) => void;
  signIn: (payload: User, callback?: VoidFunction) => void;
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

      return getFromLocalStorage('auth')  || initial;
    }
  );

  useEffect(() => {
    setLocalStorage('auth', state)
  }, [state]);

  function signUp(payload: User, cb: VoidFunction | undefined) {
    dispatch({ type: "register", payload });
    cb && cb();
  }

  function signIn(payload: User, cb: VoidFunction | undefined) {
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