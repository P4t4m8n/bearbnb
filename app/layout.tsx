import Header from "../components/ui/Header/Header";
import { Mulish } from "next/font/google";
import "../styles/main.scss";
import styles from "./layout.module.scss";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { prisma } from "@/prisma/prisma";
import { getLoggedInUser } from "@/service/user.service";

const mulish = Mulish({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["cyrillic"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerActionClient({
    cookies,
  });
  const user = await getLoggedInUser();

  return (
    <html lang="en">
      <body style={{ maxWidth: "100vw" }} className={mulish.className}>
        <section className={styles.main}>
          <Header _user={user} />

          {children}
        </section>
      </body>
    </html>
  );
}
