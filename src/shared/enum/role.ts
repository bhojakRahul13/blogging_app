export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  REGULAR = 'regular',
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string; 
}