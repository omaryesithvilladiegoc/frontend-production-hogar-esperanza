import Navbar from "../sections/components/mapa/Navbar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
