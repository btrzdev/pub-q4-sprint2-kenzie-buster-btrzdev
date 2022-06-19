import { IUser } from "../database/database";
const userWOPassword = (user: IUser) => {
  const { password, ...userWOPwd } = user;
  return userWOPwd;
};

const fixedFloat = (value: number) => {
  return Number.parseFloat((value).toFixed(2))
}

export { userWOPassword, fixedFloat};
