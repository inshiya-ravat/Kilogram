export type User = {
    email: string;
    password: string;
    username: string;
};

export interface UserState {
    entities: User[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  }