import { createContext } from 'react';

type User = {
  name: string;
  avatar: string;
}

export const UserContext = createContext<User>({
  name: 'Guest',
  avatar: '/avatar.png',
});