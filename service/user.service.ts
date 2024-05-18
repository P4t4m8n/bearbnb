import {
  UserSmallModel,
} from "@/model/user.model";

export const getEmptySmallUser = (): UserSmallModel => {
  return {
    id: "",
    firstName: "",
    lastName: "",
    imgUrl: "",
    authId: "",
    email: ",",
    isOwner: false,
    likes: [],
  };
};
