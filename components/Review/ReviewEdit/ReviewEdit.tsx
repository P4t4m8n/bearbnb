"use client";
import { ReviewModel } from "@/model/review.model";
import styles from "./ReviewEdit.module.scss";
import { StaySmallModel } from "@/model/stay.model";
import { useState } from "react";
import { CheckSVG, LogoSVG, RatingSVG } from "../../svgs/svgs";

interface Props {
  review: ReviewModel;
  stay: StaySmallModel;
  onSaveReview: (review: ReviewModel) => Promise<ReviewModel|null>;
  userId?: string;
}
export default function ReviewEdit({
  review,
  stay,
  onSaveReview,
  userId,
}: Props) {
  const [page, setPage] = useState(1);
  const [reviewState, setReviewState] = useState(review);

  const handleChange = (
    ev:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let { name, value, type } = ev.target;

    setReviewState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    const newReview = await onSaveReview(reviewState);
  };
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <section className={styles.reviewEdit}>
      <header>
        <LogoSVG />
        <h3>Step {page}</h3>
      </header>
      {page === 1 && (
        <section className={styles.overallRating}>
          <div>
            <h2>Describe you stay at {stay.name}</h2>
            <p>
              Help other guests find the fright place for their trip,Your host
              will only see answers that multiple guests picked
            </p>
          </div>
          <div>
            <h3>
              How did your stay at {stay.name} compare to your expectations?
            </h3>
            <input
              onChange={handleChange}
              name="overallRating"
              value="1"
              type="radio"
              id="overallRating1"
            ></input>
            <label htmlFor="overallRating1">
              <span>Much better then i expected</span>
              <CheckSVG />
            </label>

            <input
              onChange={handleChange}
              name="overallRating"
              value="2"
              type="radio"
              id="overallRating2"
            ></input>
            <label htmlFor="overallRating2">
              <span>A bit better then i expected</span>
              <CheckSVG />
            </label>
            <input
              onChange={handleChange}
              name="overallRating"
              value="3"
              type="radio"
              id="overallRating3"
            ></input>
            <label htmlFor="overallRating3">
              <span>About the same as i expected</span>
              <CheckSVG />
            </label>
            <input
              onChange={handleChange}
              name="overallRating"
              value="4"
              type="radio"
              id="overallRating4"
            ></input>
            <label htmlFor="overallRating4">
              <span>A bit worse then i expected</span>
              <CheckSVG />
            </label>
            <input
              onChange={handleChange}
              name="overallRating"
              value="5"
              type="radio"
              id="overallRating5"
            ></input>
            <label htmlFor="overallRating5">
              <span>Much worse then i expected</span>
              <CheckSVG />
            </label>
          </div>
          <button className={styles.nextBtn} onClick={() => setPage(2)}>
            Next
          </button>
        </section>
      )}
      {page === 2 && (
        <section className={styles.rating}>
          {[
            "cleanliness",
            "communication",
            "checkIn",
            "accuracy",
            "location",
          ].map((ratingName) => (
            <div key={ratingName} className={styles[ratingName]}>
              <h2>{capitalizeFirstLetter(ratingName)}</h2>
              <ul>
                {[1, 2, 3, 4, 5].map((value) => (
                  <li key={`${ratingName}${value}`}>
                    <input
                      onChange={handleChange}
                      name={ratingName}
                      value={value}
                      type="radio"
                      id={`${ratingName}${value}`}
                    />
                    <label
                      htmlFor={`${ratingName}${value}`}
                      className={
                        +(reviewState[ratingName as keyof ReviewModel] ?? 0) >=
                        +value
                          ? styles.checked
                          : ""
                      }
                    >
                      <RatingSVG className="" />
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className={styles.actions}>
            <button className={styles.nextBtn} onClick={() => setPage(1)}>
              back
            </button>
            <button className={styles.nextBtn} onClick={() => setPage(3)}>
              Next
            </button>
          </div>
        </section>
      )}
      {page === 3 && (
        <section className={styles.review}>
          <h2>Write a review</h2>
          <div className={styles.textCon}>
            <textarea
              value={reviewState.text}
              onChange={handleChange}
              name="text"
              rows={5}
              cols={50}
              maxLength={250}
              placeholder="Add Review"
              autoFocus={true}
            ></textarea>
            <h5>{review.text.length}/250 characters</h5>
          </div>
          <div className={styles.actions}>
            <button className={styles.nextBtn} onClick={() => setPage(2)}>
              back
            </button>
            <button className={styles.nextBtn} onClick={onSubmit}>
              Save
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
