import ProfileNav from "@/components/Profile/Nav/ProfileNav";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
      <ProfileNav />
      {children}
    </section>
  );
}
