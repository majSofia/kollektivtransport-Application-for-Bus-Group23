// Dummy database - saved in memory and localStorage
export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

const STORAGE_KEY = 'kudo_users_db';
const AUTH_KEY = 'kudo_current_user';

// Initialiser users fra localStorage eller bruk default
const initializeUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [
    {
      id: 1,
      fullName: 'Arsim Farzan',
      email: 'arsim@mail.no',
      password: '123456'
    },
    {
      id: 2,
      fullName: 'Kudo Sofia',
      email: 'kudo@test.no',
      password: 'password'
    },
    {
      id: 3,
      fullName: 'Mahmoud Idris',
      email: 'idris@test.no',
      password: 'test123'
    }
  ];
};

let users: User[] = initializeUsers();

// Lagre users til localStorage
const saveToStorage = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Bring all users
export const getAllUsers = (): User[] => {
  return users;
};

// find users by email
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// To check if the email already exists
export const emailExists = (email: string): boolean => {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Create new user
export const addUser = (fullName: string, email: string, password: string): User => {
  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    fullName,
    email,
    password
  };
  users.push(newUser);
  saveToStorage(); // Lagre til localStorage
  return newUser;
};

// Authenticate login
export const validateLogin = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Lagre innlogget bruker
export const saveCurrentUser = (user: User): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

// Hent innlogget bruker
export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
};

// Logg ut bruker
export const logoutUser = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

// show all users by used console
export const debugShowAllUsers = (): void => {
  console.table(users);
};
