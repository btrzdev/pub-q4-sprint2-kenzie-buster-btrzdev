import IUser from "../database/database";
const userWOPassword = (user: IUser) => {
  const { password, ...userWOPwd } = user;
  return userWOPwd;
};

export default userWOPassword;