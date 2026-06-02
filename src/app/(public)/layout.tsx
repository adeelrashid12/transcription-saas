import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container" style={{ minHeight: 'calc(100vh - 400px)' }}>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
