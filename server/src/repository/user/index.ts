

export interface IUserRepository {
  getUserByEmail(email: string);
  signUp(fullName: string, email: string, googleAccessToken: string);
}