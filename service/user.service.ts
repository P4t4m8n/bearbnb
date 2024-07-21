import { UserModel, UserSmallModel } from "@/model/user.model";

// export const getEmptySmallUser = (): UserModel => {
//   return {
//     _id: "",
//     dob: new Date(),
//     firstName: "",
//     lastName: "",
//     imgUrl: "",
//     authId: "",
//     email: ",",
//     isOwner: false,
//   };
// };
export const userToSmallUser = (user: UserModel): UserSmallModel => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    imgUrl: user.imgUrl,
  };
};
