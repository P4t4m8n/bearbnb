import { BedRoomModel, bedsType, BedsTypes } from "@/model/bedroom.model";
import styles from "./StayEditRoomsModel.module.scss";
import Image from "next/image";
import { PencilSVG, TrashSVG } from "@/components/svgs/svgs";
import { useMemo, useState } from "react";
import { getBedroomMap } from "@/service/stay.service";
import RoomImageUpload from "./RoomImageUpload/RoomImageUpload";

interface Props {
  bedRoom: BedRoomModel;
  idx: number;
  saveBedRoom: (idx: number, bedrooms?: BedRoomModel) => void;
}

export default function StayEditRoomsModel({
  bedRoom,
  idx,
  saveBedRoom,
}: Props) {
  const [isBedRoomModelOpen, setIsBedRoomModelOpen] = useState(false);
  const [bedRoomState, setBedRoomState] = useState<BedRoomModel>(bedRoom);

  const bedRoomMap = useMemo(
    () => getBedroomMap(bedRoomState),
    [bedRoomState.beds]
  );
  const bedTypes = useMemo(() => bedsType, []);
  const totalBeds = useMemo(() => {
    return bedRoomState.beds.reduce(
      (total, bed) => total + (bedRoomMap[bed] || 0),
      0
    );
  }, [bedRoomState.beds]);

  const addBed = (bed: BedsTypes) => {
    setBedRoomState((prev) => ({
      ...prev,
      beds: [...prev.beds, bed],
    }));
  };

  const removeBed = (idx: number) => {
    setBedRoomState((prev) => ({
      ...prev,
      beds: prev.beds.filter((_, _idx) => _idx !== idx),
    }));
  };

  const onSaveBedRoom = () => {
    saveBedRoom(idx, bedRoomState);
    setIsBedRoomModelOpen(false);
  };

  const closeModel = () => {
    setBedRoomState(bedRoom);
    setIsBedRoomModelOpen(false);
  };

  const { image } = bedRoomState;

  return (
    <>
      <button
        className={styles.modelButton}
        onClick={() => setIsBedRoomModelOpen(true)}
      >
        {image ? (
          <Image width={176} height={152} src={image} alt="bedroom" />
        ) : (
          <PencilSVG />
        )}
        {!bedRoom.beds.length ? <p>No beds</p> : <p>{totalBeds} beds</p>}
      </button>
      {isBedRoomModelOpen && (
        <div className={styles.bedRoomModel}>
          <div className={styles.modelHeader}>
            <button onClick={closeModel}>X</button>
            <h1 className={styles.modelHeaderText}>Edit bedrooms</h1>
          </div>
          <RoomImageUpload image={image} setBedRoomState={setBedRoomState} />

          <div className={styles.selectBeds}>
            <h1>Pick beds</h1>
            <select onChange={(ev) => addBed(ev.target.value as BedsTypes)}>
              <option value="">Add Bed</option>
              {bedTypes.map((bed, index) => (
                <option key={index} value={bed}>
                  {bed}
                </option>
              ))}
            </select>
          </div>

          <ul className={styles.bedsList}>
            {bedRoomState.beds.map((bed, index) => (
              <li key={index}>
                <p>{bed}</p>
                <button
                  className={styles.imgRemoveBtn}
                  onClick={() => removeBed(index)}
                >
                  <TrashSVG />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <button onClick={closeModel}>Cancel</button>
            <button onClick={onSaveBedRoom}>Save</button>
          </div>
        </div>
      )}
    </>
  );
}
