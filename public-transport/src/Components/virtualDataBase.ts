// Dummy database - saved in memory
export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
}


let users: User[] = [
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
    id: users.length + 1,
    fullName,
    email,
    password
  };
  users.push(newUser);
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

// show all users by used console 
export const debugShowAllUsers = (): void => {
  console.table(users);
};