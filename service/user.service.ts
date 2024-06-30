import { UserModel } from "@/model/user.model";

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
