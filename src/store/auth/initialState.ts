

export interface User {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface IAuthState {
   user: User | null;
}

const initialState = {
   user: null,
} as unknown as IAuthState;

export default initialState;