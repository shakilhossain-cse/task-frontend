import { IAuthState, User } from "./initialState";

interface loginUser {
  type: "login";
  payload: User | null;
}

interface RegisterUser {
  type: "register";
  payload: User; // You may adjust payload based on your requirements
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
        user: action.payload as User,
      };
    case "register":
      return { ...state, user: action.payload as User };
    case "logout":
      return {
        ...state,
        user: null,
      };

    default:
      throw new Error("Unexpected action: ");
  }
}

export default authReducer;
