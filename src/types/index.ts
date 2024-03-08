export interface INewUser {
  name: string,
  email: string,
  username?: string,
  password: string
}
export interface IUserFromAccount {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}