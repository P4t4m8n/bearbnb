import { UserModel, UserSmallModel } from "@/model/user.model";

export const getEmptySmallUser = (): UserModel => {
  return {
    _id: "",
    dob: new Date(),
    firstName: "",
    lastName: "",
    imgUrl: "",
    authId: "",
    email: ",",
    isOwner: false,
  };
};
export const userToSmallUser = (user: UserModel): UserSmallModel => {
  const smallUser: UserSmallModel = {
    _id: typeof user._id === "string" ? user._id : user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
  };

  if (user.imgUrl) smallUser.imgUrl = user.imgUrl;
  if (user.ownerSince) smallUser.ownerSince = user.ownerSince;
  return smallUser;
};
