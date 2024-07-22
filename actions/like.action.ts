"use server";
import "server-only";
import { dbService } from "@/db/db.service";
import { LikeDTO, LikeExtendedModel, LikeModel } from "@/model/Like.model";
import { ObjectId } from "mongodb";

export const getLike = async (
  userId: string,
  stayId: string
): Promise<LikeModel | null> => {
  const collection = await dbService.getCollection("likes");
  const like = (await collection.findOne({
    userId,
    stayId,
  })) as unknown as LikeModel;
  return like;
};

export const getLikes = async (
  filter: Partial<LikeModel>
): Promise<LikeModel[]> => {
  const collection = await dbService.getCollection("likes");

  const fixedFilter: LikeDTO = {};
  if (filter._id) {
    fixedFilter._id = new ObjectId(filter._id);
  }
  if (filter.userId) {
    fixedFilter.userId = new ObjectId(filter.userId);
  }
  if (filter.stayId) {
    fixedFilter.stayId = new ObjectId(filter.stayId);
  }
  const likesData = await collection.find(fixedFilter).toArray();

  const likes = likesData.map((like) => {
    const { _id, userId, stayId, note } = like;
    return {
      _id: _id.toString(),
      userId: userId.toString(),
      stayId: stayId.toString(),
      note,
    };
  });

  return likes;
};

export const getLikesExtended = async (
  filter: Partial<LikeModel>
): Promise<LikeExtendedModel[] | null> => {
  const collection = await dbService.getCollection("likes");
  const fixedFilter: LikeDTO = {};
  if (filter._id) {
    fixedFilter._id = new ObjectId(filter._id);
  }
  if (filter.userId) {
    fixedFilter.userId = new ObjectId(filter.userId);
  }
  if (filter.stayId) {
    fixedFilter.stayId = new ObjectId(filter.stayId);
  }

  const pipeline = [
    {
      $match: fixedFilter,
    },
    {
      $lookup: {
        from: "stays",
        localField: "stayId",
        foreignField: "_id",
        as: "stay",
      },
    },
    {
      $unwind: "$stay",
    },
    {
      $lookup: {
        from: "locations",
        localField: "stay.locationId",
        foreignField: "_id",
        as: "location",
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        stayId: 1,
        note: 1,
        stayName: "$stay.name",
        images: "$stay.images",
        type: "$stay.type",
        city: "$location.city",
        country: "$location.country",
        rating: "$stay.rating",
        description: "$stay.description",
        bedrooms: "$stay.bedrooms",
      },
    },
  ];

  const likesData = await collection.aggregate(pipeline).toArray();
  const likes = likesData.map((like) => {
    const {
      _id,
      userId,
      stayId,
      note,
      stayName,
      images,
      type,
      city,
      country,
      rating,
      description,
      bedrooms,
    } = like;
    return {
      _id: _id.toString(),
      userId: userId.toString(),
      stayId: stayId.toString(),
      note,
      stayName,
      images,
      type,
      city,
      country,
      rating,
      description,
      bedrooms,
    };
  });
  return likes;
};

export const saveLike = async (
  likeToSave: Partial<LikeModel>
): Promise<string | null> => {
  if (likeToSave._id) return await _update(likeToSave);
  if (likeToSave.userId && likeToSave.stayId) return await _create(likeToSave);

  return null;
};

export const removeLike = async (likeId: string): Promise<null> => {
  const collection = await dbService.getCollection("likes");
  await collection.deleteOne({ _id: new ObjectId(likeId) });
  return null;
};

////////////////// Private functions //////////////////
const _create = async (like: Partial<LikeModel>): Promise<string> => {
  const collection = await dbService.getCollection("likes");
  const likeToSave: LikeDTO = {
    userId: new ObjectId(like.userId),
    stayId: new ObjectId(like.stayId),
    note: like.note,
  };
  const data = await collection.insertOne(likeToSave);

  return data.insertedId.toString();
};

const _update = async (like: Partial<LikeModel>): Promise<string> => {
  const collection = await dbService.getCollection("likes");
  const likeToSave: LikeDTO = {
    userId: new ObjectId(like.userId),
    stayId: new ObjectId(like.stayId),
    note: like.note,
  };
  await collection.updateOne(
    { _id: new ObjectId(like._id) },
    { $set: likeToSave }
  );

  return like._id!;
};
