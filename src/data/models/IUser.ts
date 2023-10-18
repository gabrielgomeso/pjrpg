export interface IUser {
  id: string;
  created_at: string;
  email: string;
  username: string;
  role: "user" | "admin";
}
