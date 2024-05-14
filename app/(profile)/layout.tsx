import ProfileNav from "@/components/ui/Profile/Nav/ProfileNav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ minWidth: "100%" }}>
      <ProfileNav />
      {children}
    </section>
  );
}
