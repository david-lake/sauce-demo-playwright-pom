export type User = {
  username: string;
  password: string;
};

type UserRole = 'standard' | 'locked';

export const users: Record<UserRole, User> = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  }
};