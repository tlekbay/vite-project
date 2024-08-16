export interface User {
    id: string;
    name: string;
    surname: string;
    mail: string;
    skills: { skill: string }[];
    registration_date: string;
  }

export interface UserState {
  isLoading: boolean;
  data: User[];
  error: string | null;
}