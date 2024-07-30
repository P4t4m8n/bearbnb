import { StayModel } from "@/model/stay.model";
import styles from "./StayEditPreview.module.scss";
import { useRef } from "react";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import {
  DynamicSVG,
  GreetingSVG,
  PencilSVG,
  PlusSVG,
  RatingSVG,
} from "@/components/svgs/svgs";
import { CalendarSVG } from "@/components/svgs/amentiasSVG";
interface Props {
  stay: StayModel;
}
export default function StayEditPreview({ stay }: Props) {
  const editPreviewModel = useRef(null);
  const [isEditPreviewModel, setIsEditPreviewModel] =
    useModal(editPreviewModel);

  return (
    <section className={styles.editPreview}>
      <section className={styles.editPreviewBody}>
        <div className={styles.editPreviewBodyHeader}>
          <h1>Yay! It’s time to publish.</h1>
          <p>
            {
              "Here's what we'll show to guests. Before you publish, make sure to review the details."
            }
          </p>
        </div>

        <button
          className={styles.previewBtn}
          onClick={() => setIsEditPreviewModel(true)}
        >
          <h4>Show preview</h4>
          <Image src={stay.images[0]} alt="stay" width={324} height={324} />
          <h3 className={styles.name}>{stay.name}</h3>
          <div className={styles.price}>
            <h3>
              {stay.currency}
              {stay.price}
            </h3>
            <p>night</p>
          </div>
          <div className={styles.rating}>
            <p>New</p>
            <RatingSVG  />
          </div>
        </button>

        <div className={styles.editPreviewTxt}>
          <h2>{"What's next?"}</h2>
          <div>
            <CalendarSVG />
            <h3>Set up your calendar</h3>
            <p>
              Choose which dates are available. Guests can start booking 24
              hours after you publish.
            </p>
          </div>
          <div>
            <PencilSVG />
            <h3>Adjust your settings</h3>
            <p>
              Set house rules, select a cancellation policy, choose how guests
              can book, and more.
            </p>
          </div>
          <div>
            <GreetingSVG />
            <h3>Prepare for your first guest</h3>
            <p>
              Find tips in our Resource Center or get one-to-one guidance from a
              Superhost.
            </p>
          </div>
        </div>
      </section>
      {isEditPreviewModel && (
        <section ref={editPreviewModel} className={styles.editPreviewModel}>
          <div className={styles.editPreviewModelHeader}>
            <button onClick={() => setIsEditPreviewModel(false)}>
              <PlusSVG />
            </button>
            <h4>Full preview</h4>
          </div>
          <Image src={stay.images[0]} alt="stay" width={428} height={421} />
          <ul className={styles.editPreviewModelInfo}>
            <li className={styles.editPreviewList}>{stay.name}</li>

            <li className={styles.editPreviewList}>
              <h2>{`${stay.guestStay} ${stay.type} hosted by ${stay.host.firstName}`}</h2>
              <span>
                <p>{`${stay.capacity} guest${
                  stay.capacity > 1 ? `'s` : ""
                }`}</p>
                <p>{`${stay.bedRooms.length} bedroom${
                  stay.bedRooms.length > 1 ? `'s` : ""
                }`}</p>
                <p>{`${stay.baths} bathroom${stay.baths > 1 ? `'s` : ""}`}</p>
              </span>
              <Image
                src={stay.host.imgUrl!}
                alt="host"
                width={48}
                height={48}
              />
            </li>
            
            <li className={styles.editPreviewList}>{stay.description}</li>
            <li>
              <h3>Amenities</h3>
              <ul className={styles.amenitiesList}>
                {stay.amenities.map((amenity) => (
                  <li key={amenity._id}>
                    <p>{amenity.name}</p>
                    <DynamicSVG
                      path={amenity.path!}
                      viewBox={amenity.viewBox!}
                    />
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <h3>Location</h3>
              <p>{`${stay.location.streetAddress}, ${stay.location.city}, ${stay.location.country}`}</p>
            </li>
          </ul>
        </section>
      )}
    </section>
  );
}
