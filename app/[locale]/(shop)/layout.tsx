import Header from "@/components/layout/Header";
import PageLoader from "@/components/PageLoader";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoader />
      <Header />
      <main className="flex-grow">{children}</main>
    </>
  );
}
