import Image from "next/image";
import { Stay } from "../../model/stay.model";
import { LikeSVG, RatingSVG } from "../svgs/svgs";
import { faker } from "@faker-js/faker";
interface Props {
  stay: Stay;
}
export default function StayPreview({ stay }: Props) {
  const { rating, price, location, images } = stay;
  const { city, country } = location;
  const roundNum = Number(rating.toFixed(2));
  const distance = faker.number.int({ min: 10, max: 1200 });

  return (
    <li className="stay-preview">
      <LikeSVG />
      <Image
        src={images[0].url}
        layout="responsive"
        objectFit="cover"
        alt=""
      ></Image>
      <div className="info-head">
        <h3>
          {city}, {country}
        </h3>
        <div className="rating">
          <RatingSVG />
          <h5>{roundNum}</h5>
        </div>
      </div>
      <h6>{distance} kilometers away</h6>
      <h6>May 7-12</h6>
      <div className="price">
        <h3>{price}$</h3>
        <h5>night</h5>
      </div>
    </li>
  );
}
