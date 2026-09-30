export interface IUser {
  id: string | number;
  name: string;
  role?: string;
  department?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  location?: string;
  birthday?: Date;
  status: "Aktiv" | "Inaktiv";
}
