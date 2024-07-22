import Header from "@/components/Header/Header";
import styles from "./layout.module.scss";
import LoginModel from "@/components/User/Login/Modal/LoginModel";
import { Suspense } from "react";
import HeaderServer from "@/components/Header/HeaderServer";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className={styles.main}>
      <HeaderServer />
      {children}
      <Suspense fallback={<div>Loading...</div>}>
        <LoginModel />
      </Suspense>
    </main>
  );
}
