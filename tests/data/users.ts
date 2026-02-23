export type User = {
  username: string;
  password: string;
};

type UserRole = 'standard';

export const users: Record<UserRole, User> = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  }
};