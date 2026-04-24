import Navbar from "../sections/components/mapa/Navbar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="pt-[var(--navbar-safe-offset-mobile)] md:pt-0">
        {children}
      </div>
    </div>
  );
}
