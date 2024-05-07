import Header from "../components/ui/Header/Header";
import { Mulish } from "next/font/google";
import "../styles/main.scss";
import styles from "./layout.module.scss";
import { getLoggedInUser } from "@/service/user.service";
import "./global.scss";

const mulish = Mulish({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  style: ["normal"],
  subsets: ["cyrillic"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();

  return (
    <html lang="en">
      <body
        style={{ maxWidth: "100vw" }}
        className={`${mulish.className} ${styles.body}`}
      >
        <section className={styles.main}>
          <Header _user={user} />
          
          {children}
        </section>
      </body>
    </html>
  );
}
