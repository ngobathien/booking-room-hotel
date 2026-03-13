export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone_number: string;
  role: string;
  status: string;
}

export interface UserContextType {
  users: User[];
  currentUser: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setCurrentUser: (user: User | null) => void;
}
