import { Mulish } from "next/font/google";
import "../styles/main.scss";
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


  return (
    <html lang="en">
      <body
        style={{ maxWidth: "100vw" }}
        className={`${mulish.className}`}
      >
        {children}
      </body>
    </html>
  );
}
