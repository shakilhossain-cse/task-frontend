export interface IUser{
    user: {
      name: string;
      email: string;
      updated_at: string;
      created_at: string;
      id: number;
    } | null;
    token: string | null;
    isAuthenticated?: boolean;
  }