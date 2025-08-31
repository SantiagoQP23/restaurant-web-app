export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  samePassword: string;
  numPhone?: string;
}
