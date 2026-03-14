export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone_number: string;
  role: string;
  status: UserStatus;
}

export interface UserContextType {
  users: User[];
  currentUser: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setCurrentUser: (user: User | null) => void;
}

export const STATUS_USER_STYLE: Record<UserStatus, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-yellow-100 text-yellow-700",
  BLOCKED: "bg-red-100 text-red-700",
};

export type CreateUserPayload = Omit<User, "_id">;
