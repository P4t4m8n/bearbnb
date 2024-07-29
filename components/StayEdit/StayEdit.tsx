"use client";
import { GuestStayType, StayModel, StayType } from "@/model/stay.model";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./StayEdit.module.scss";
import StayEditType from "./StayEditType/StayEditType";
import StayEditShared from "./StayEditShared/StayEditShared";
import StayEditLocation from "./StayEditLocation/StayEditLocation";
import { LocationModel } from "@/model/location.model";
import { getUserLocation } from "@/service/locations.service";
import TransitionPage from "./TransitionPage/TransitionPage";
import { AmenityModel } from "@/model/amenity.model";
import StayEditAmenities from "./StayEditAmenities/StayEditAmenities";
import StayEditImages from "./StayEditImages/StayEditImages";
import StayEditName from "./StayEditName/StayEditName";
import StayEditPrice from "./StayEditPrice/StayEditPrice";
import StayEditPreview from "./StayEditPreview/StayEditPreview";
import { useUserStore } from "@/store/useUserStore";
import { saveStay } from "@/actions/stay.action";
import { useRouter } from "next/navigation";
import StayEditRooms from "./StayEditRooms/StayEditRooms";
import { BedRoomModel } from "@/model/bedroom.model";
import { HighlightModel } from "@/model/highlight.model";
import StayEditHighlights from "./StayEditHighlights/StayEditHighlights";
import Link from "next/link";
import { LogoSVG } from "../svgs/svgs";

interface Props {
  stay: StayModel;
  dbAmenities: AmenityModel[];
}
export default function StayEdit({ stay, dbAmenities }: Props) {
  const [stage, setStage] = useState(1);
  const [stateStay, setStateStay] = useState<StayModel>(stay);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const { lat, lng } = stay.location;
    if (lat === 0 && lng === 0) {
      loadUserCoord();
    }
    if (user) {
      const smallUser = {
        _id: user._id as string,
        firstName: user.firstName,
        lastName: user.lastName,
        imgUrl: user.imgUrl,
        ownerSince: user.ownerSince,
      };
      setStateStay({ ...stay, host: smallUser });
    }
  }, [user]);

  const loadUserCoord = async () => {
    try {
      const { lat, lng } = await getUserLocation();
      setStateStay((prev) => {
        const location = { ...prev.location, lat, lng };
        return { ...prev, location };
      });
    } catch (error) {
      console.error("Failed to get user location:", error);
    }
  };

  const onStayTypeChange = (type: StayType) => {
    setStateStay((prev) => ({ ...prev, type }));
  };

  const handleStayShared = (guestStay: GuestStayType) => {
    setStateStay((prev) => ({ ...prev, guestStay }));
  };

  const handleLocation = (location: LocationModel) => {
    setStateStay((prev) => ({ ...prev, location }));
  };

  const handleBedroom = (idx: number, bedRoom?: BedRoomModel) => {
    const bedRooms = stateStay.bedRooms;
    if (bedRoom) {
      bedRooms[idx] = bedRoom;
    } else {
      bedRooms.splice(idx, 1);
    }
    setStateStay((prev) => ({ ...prev, bedRooms }));
  };

  const handleRooms = (
    type: "capacity" | "bedRooms" | "baths",
    value: number
  ) => {
    if (type !== "bedRooms") {
      setStateStay((prev) => ({ ...prev, [type]: value }));
      return;
    }
    let bedRooms;
    if (value > stateStay.bedRooms.length) {
      bedRooms = [...stateStay.bedRooms, { beds: [], image: "" }];
    } else {
      bedRooms = stateStay.bedRooms.slice(0, -1);
    }
    setStateStay((prev) => ({ ...prev, bedRooms }));
  };

  const handleAmenities = (amenity: Partial<AmenityModel>) => {
    const amenities = stateStay.amenities;
    const idx = amenities.findIndex((_amenity) => _amenity._id === amenity._id);
    if (idx === -1) {
      amenities.push(amenity as AmenityModel);
    } else {
      amenities.splice(idx, 1);
    }
    setStateStay((prev) => ({ ...prev, amenities }));
  };

  const handleImages = (imgUrl: string, isDelete: boolean) => {
    let images;
    if (isDelete) {
      images = stateStay.images.filter((img) => img !== imgUrl);
    } else {
      images = [...stateStay.images, imgUrl];
    }
    setStateStay((prev) => ({ ...prev, images }));
  };

  const setText = (ev: ChangeEvent) => {
    const target = ev.target as HTMLTextAreaElement;
    const { name, type } = target;
    let value: string | number = target.value;

    if (type === "number") value = +value;
    setStateStay((prev) => ({ ...prev, [name]: value }));
  };

  const arrangeImages = useCallback(
    (imgIdx: number, dir: number) => {
      if (imgIdx + dir < 0 || imgIdx + dir >= stateStay.images.length) return;
      const images = [...stateStay.images];
      const temp = images[imgIdx];
      if (dir === 0) {
        images[imgIdx] = images[dir];
        images[dir] = temp;
      } else {
        images[imgIdx] = images[imgIdx + dir];
        images[imgIdx + dir] = temp;
      }
      setStateStay((prev) => ({ ...prev, images }));
    },
    [stateStay]
  );

  const onSaveStay = async (ev: MouseEvent) => {
    try {
      const stay = await saveStay(stateStay);
      router.push(`/profile/${stay._id}`);
    } catch (error) {
      console.error("Failed to save stay:", error);
    }
  };

  const handleHighlights = (
    highlight: HighlightModel,
    isAdd: boolean,
    idx?: number
  ) => {
    if (isAdd && idx !== undefined) {
      const highlights = [...stateStay.highlights];
      highlights[idx] = highlight;
      setStateStay((prev) => ({ ...prev, highlights }));
      return;
    }
    if (isAdd) {
      const highlights = [...stateStay.highlights, highlight];
      setStateStay((prev) => ({ ...prev, highlights }));
      return;
    }

    const highlights = stateStay.highlights.filter((_, index) => index !== idx);
    setStateStay((prev) => ({ ...prev, highlights }));
  };

  const isDisabled =
    (stage === 4 && !stateStay.location.country) ||
    (stage === 5 &&
      (!stateStay.location.streetAddress ||
        !stateStay.location.city ||
        !stateStay.location.countryCode ||
        !stateStay.location.city)) ||
    (stage === 8 && stateStay.capacity < 1) ||
    (stage === 11 && stateStay.images.length < 5) ||
    (stage === 13 && (!stateStay.name || stateStay.name.length > 32)) ||
    (stage === 14 &&
      (!stateStay.description || stateStay.description.length > 500));

  const widthStyleOne = {
    width: `${(stage % 6) * 14.285}%`,
  };
  const widthStyleTwo = {
    width: stage < 13 && stage >= 7 ? `${(stage % 5) * 20}%` : "",
  };
  const widthStyleThree = {
    width: stage >= 13 ? `${(stage % 5) * 20}%` : "",
  };

  // let checkedAmenities: string[] = [];
  // if (stage === 9)
  //   checkedAmenities = stateStay.amenities.map((amenity) => amenity.name);
  return (
    <section className={styles.stayEdit}>
      <div className={styles.editHeader}>
        <Link href={"/"} className={styles.logo}>
          <LogoSVG />
        </Link>
      </div>
      {stage === 1 && (
        <TransitionPage
          heading1={"Tell us about your place"}
          heading2={"Step 1"}
          heading3={
            "In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay."
          }
        />
      )}

      {stage === 2 && (
        <StayEditType
          selectedType={stateStay.type}
          onStayTypeChange={onStayTypeChange}
        />
      )}

      {stage === 3 && (
        <StayEditShared
          guestStay={stateStay.guestStay!}
          handleStayShared={handleStayShared}
        />
      )}

      {stage >= 4 && stage <= 6 && (
        <StayEditLocation
          stage={stage}
          location={stateStay.location}
          setLocation={handleLocation}
          setStage={setStage}
        />
      )}

      {stage === 7 && (
        <TransitionPage
          heading1={"Make your place stand out"}
          heading2={"Step 2"}
          heading3={
            "In this step, you’ll add some of the amenities and highlights your place offers, plus 5 or more photos. Then, you’ll create a title and description."
          }
        />
      )}

      {stage === 8 && (
        <StayEditRooms
          capacity={stateStay.capacity}
          bedRooms={stateStay.bedRooms}
          baths={stateStay.baths}
          handleRooms={handleRooms}
          saveBedRoom={handleBedroom}
        />
      )}

      {stage === 9 && (
        <StayEditAmenities
          amenities={dbAmenities}
          userAmenities={stateStay.amenities}
          handleAmenity={handleAmenities}
        />
      )}
      {stage === 10 && (
        <StayEditHighlights
          highlights={stateStay.highlights}
          handleHighlights={handleHighlights}
        />
      )}
      {stage === 11 && (
        <StayEditImages
          images={stateStay.images}
          setImages={handleImages}
          type={stateStay.type}
          arrangeImages={arrangeImages}
        />
      )}

      {stage === 12 && (
        <TransitionPage
          heading1={"Finish up and publish"}
          heading2={"Step 3"}
          heading3={
            "Finally, you'll choose name and description, set up pricing, and publish your listing."
          }
        />
      )}
      {stage === 13 && (
        <StayEditName
          value={stateStay.name}
          name={"name"}
          setText={setText}
          heading1={`Now, let's give your ${stateStay.type} a title`}
          paragraph={
            "Short titles work best. Have fun with it—you can always change it later"
          }
          maxLength={32}
          rows={4}
        />
      )}
      {stage === 14 && (
        <StayEditName
          value={stateStay.description}
          name={"description"}
          setText={setText}
          heading1={"Create your description"}
          paragraph={"Share what makes your place special."}
          maxLength={500}
          rows={8}
        />
      )}

      {stage === 15 && (
        <StayEditPrice
          price={stateStay.price}
          handleChange={setText}
          serviceFee={0.14}
          currency={stateStay.currency}
        />
      )}

      {stage === 16 && <StayEditPreview stay={stateStay} />}

      <div className={styles.editActions}>
        <div className={styles.progressBar}>
          <div className={styles.barGray}>
            <div
              style={stage < 7 ? widthStyleOne : { width: "100%" }}
              className={styles.barDark}
            ></div>
          </div>
          <div className={styles.barGray}>
            <div
              style={stage < 13 ? widthStyleTwo : { width: "100%" }}
              className={styles.barDark}
            ></div>
          </div>
          <div className={styles.barGray}>
            <div style={widthStyleThree} className={styles.barDark}></div>
          </div>
        </div>
        <div className={styles.actionBtns}>
          <button
            className={stage <= 1 ? styles.disabled : ""}
            disabled={stage <= 1}
            onClick={() => setStage((prev) => prev - 1)}
          >
            Back
          </button>
          {stage < 15 && (
            <button
              className={`${isDisabled ? styles.disabled : ""} `}
              disabled={isDisabled}
              onClick={() => setStage((prev) => prev + 1)}
            >
              Next
            </button>
          )}
          {stage >= 15 && (
            <button className={styles.publish} onClick={onSaveStay}>
              Publish
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
