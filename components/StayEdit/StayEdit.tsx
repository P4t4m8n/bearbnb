"use client";
import { GuestStayType, StayModel, StayType } from "@/model/stay.model";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./StayEdit.module.scss";
import StayEditType from "./StayEditType/StayEditType";
import StayEditShared from "./StayEditShared/StayEditShared";
import StayEditLocation from "./StayEditLocation/StayEditLocation";
import { LocationModel } from "@/model/location.model";
import { getUserLocation } from "@/service/locations.service";

interface Props {
  stay: StayModel;
}
export default function StayEdit({ stay }: Props) {
  const [stage, setStage] = useState(4);
  const [stateStay, setStateStay] = useState<StayModel>(stay);

  useEffect(() => {
    const { lat, lng } = stay.location;
    if (lat === 0 && lng === 0) {
      loadUserCoord();
    }
  }, []);

  const loadUserCoord = async () => {
    const { lat, lng } = await getUserLocation();
    setStateStay((prev) => {
      const location = { ...prev.location, lat, lng };
      return { ...prev, location };
    });
  };

  const handleStayType = (type: StayType) => {
    setStateStay((prev) => ({ ...prev, type }));
  };

  const handleStayShared = (guestStay: GuestStayType) => {
    setStateStay((prev) => ({ ...prev, guestStay }));
  };

  const handleLocation = (location: LocationModel) => {
    setStateStay((prev) => ({ ...prev, location }));
  };

  const isDisabled =
    (stage === 5 &&
      (!stateStay.location.streetAddress ||
        !stateStay.location.city ||
        !stateStay.location.countryCode ||
        !stateStay.location.city)) ||
    (stage === 4 && !stateStay.location.country);

  const widthStyle = {
    width: `${((stage % 5) - 1) * 20}%`,
  };

  return (
    <section className={styles.stayEdit}>
      {stage === 1 && (
        <div className={styles.pageOne}>
          <div className={styles.info}>
            <h2>Step {stage}</h2>
            <h1>Tell us about your place</h1>
            <h3>
              {
                "In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay."
              }
            </h3>
          </div>
          <div className={styles.imgCon}>
            <Image
              priority={true}
              fill={true}
              sizes="auto"
              src="/createStay.png"
              alt=""
            />
          </div>
        </div>
      )}

      {stage === 2 && (
        <StayEditType type={stateStay.type} handleStayType={handleStayType} />
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

      <div className={styles.editActions}>
        <div className={styles.progressBar}>
          <div className={styles.barGray}>
            <div
              style={stage < 6 ? widthStyle : { width: "100%" }}
              className={styles.barDark}
            ></div>
          </div>
          <div className={styles.barGray}>
            <div
              style={stage > 6 ? widthStyle : {}}
              className={styles.barDark}
            ></div>
          </div>
          <div className={styles.barGray}>
            <div
              style={stage > 7 ? widthStyle : {}}
              className={styles.barDark}
            ></div>
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
          <button
            className={isDisabled ? styles.disabled : ""}
            disabled={isDisabled}
            onClick={() => setStage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
