export interface User {
  id: number|string;
  username: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  email: string;
  status: string;
  group_id: string;
  password_hash?: string
}
