export interface IUser {
  email: string;
  password: string;
}

export interface UserResponse {
  email: string;
  accessToken: string;
}
