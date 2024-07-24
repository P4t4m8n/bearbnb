import ProfileNav from "@/components/Profile/Nav/ProfileNav";
import { Suspense } from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileNav />
        {children}
      </Suspense>
    </section>
  );
}
