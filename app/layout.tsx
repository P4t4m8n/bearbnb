import Header from "./ui/Header";
import '@/app/ui/global.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" flex flex-col" >
      <Header/>
        {children}</body>
    </html>
  );
}
