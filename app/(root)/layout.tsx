import Header from "@/components/Header/Header";
import styles from "./layout.module.scss";
import LoginModel from "@/components/User/Login/Modal/LoginModel";
import { Suspense } from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <Header />
      {children}
      <Suspense fallback={<div>Loading...</div>}>
        <LoginModel />
      </Suspense>
    </main>
  );
}
