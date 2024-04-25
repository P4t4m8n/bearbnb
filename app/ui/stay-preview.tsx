import Image from "next/image";
import { Stay } from "../model/stay.model";
import { makeLorem } from "../service/util";
interface Props {
  stay: Stay;
}
export default function StayPreview({ stay }: Props) {
  const { images, name, rating } = stay;
  // console.log("images:", images)
  return (
    <li className=" min-w-60 max-w-80 scale-100">
      <Image width={160} height={320} src={images[0].url} alt=""></Image>
      <h2>{makeLorem(4)}</h2>
    </li>
  );
}
