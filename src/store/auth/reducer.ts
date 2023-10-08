import { IAuthState } from "./initialState";

interface loginUser {
  type: "login";
  payload: IAuthState;
}

interface RegisterUser {
  type: "register";
  payload: IAuthState;
}

interface LogoutUser {
  type: "logout";
}

export type Action = loginUser | RegisterUser | LogoutUser;

function authReducer(state: IAuthState, action: Action): IAuthState {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "register":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "logout":
      return {
        ...state,
        user: null,
        token: null
      };

    default:
      throw new Error("Unexpected action: ");
  }
}

export default authReducer;
