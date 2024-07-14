import ProfileNav from "@/components/Profile/Nav/ProfileNav";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ minWidth: "100%", display: "grid", gap: "1rem" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileNav />
      </Suspense>
      {children}
    </section>
  );
}
