import styles from "./MyStayList.module.scss";
import MyStayPreview from "../MyStayPreview/MyStayPreview";
import { getSmallStays } from "@/actions/stay.action";

export default async function MyStayList({ userId }: { userId: string }) {
  const userStays = await getSmallStays({ host: userId });

  return (
    <ul className={styles.list}>
      <li>
        <h4>#</h4>
        <h4>Name</h4>
        <h4>Price</h4>
        <h4>Location</h4>
        <h4>Rating</h4>
        <h4>Type</h4>
        <h4>Actions</h4>
      </li>
      {userStays.map((stay, idx) => (
        <MyStayPreview idx={idx + 1} key={stay._id} stay={stay} />
      ))}
    </ul>
  );
}
