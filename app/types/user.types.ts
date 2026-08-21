export interface UsersParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface UpdateUserInput {
  name: string;
  email: string;
  active: boolean;
}
