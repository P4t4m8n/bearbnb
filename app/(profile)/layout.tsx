import ProfileNav from "@/components/ui/Profile/Nav/ProfileNav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ minWidth: "100%", display: "grid", gap: "1rem" }}>
      <ProfileNav />
      {children}
    </section>
  );
}
