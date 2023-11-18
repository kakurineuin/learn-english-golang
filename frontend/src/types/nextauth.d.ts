// 參考 https://reacthustle.com/blog/extend-user-session-nextauth-typescript

import { DefaultUser } from 'next-auth';

export enum Role {
  user = 'user',
  admin = 'admin',
}

interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  role?: Role;
}

declare module 'next-auth' {
  interface User extends IUser { }
  interface Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser { }
}
