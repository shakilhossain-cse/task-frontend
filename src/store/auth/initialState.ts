

export interface User {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface IAuthState {
   user: User | null,
   token: string | null,
 }

const initialState: IAuthState = {
   user: null,
   token: null
 };

export default initialState;