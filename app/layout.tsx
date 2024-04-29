import Header from "../components/ui/Header/Header";
import { Mulish } from "next/font/google";
import "../styles/main.scss";
import styles from "./layout.module.scss";

const mulish = Mulish({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["cyrillic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>
          <section className={styles.main}>
            <Header />

            {children}
          </section>
      </body>
    </html>
  );
}
