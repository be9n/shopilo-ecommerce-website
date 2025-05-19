import AnnouncementBar from "@/components/layout/AnnouncementBar";
import MainHeader from "@/components/layout/MainHeader";
import PageLoader from "@/components/PageLoader";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoader />
      <AnnouncementBar />
      <MainHeader />
      <main className="flex-grow">{children}</main>
    </>
  );
}
