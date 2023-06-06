export type authPayload = {
  user: User;
  accessToken: string;
};

export type User = {
  id: number;
  email?: string;
  password?: string;
  name: string;
  phone?: null;
  roles: string;
  createdAt: Date;
  updatedAt: Date;
};
