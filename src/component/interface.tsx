export interface IBaseUser {
  name: string;
  profession: string;
  age: Date;
  gender: "female" | "male" | "other"
}
export interface IUser extends IBaseUser {
  id: number;
}
