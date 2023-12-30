export interface User {
  name: string;
  email: string;
  // ... outras propriedades, se houver
}

export interface UserData {
  user: Partial<User>; // 'user' é uma versão parcial de 'User'
}
