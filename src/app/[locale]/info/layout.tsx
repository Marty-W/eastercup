import { InfoPageHeader } from "@/components/infoPageHeader";

interface Props {
  children: React.ReactNode;
}
export default function InfoPageLayout({ children }: Props) {
  return (
    <div className="flex min-h-[50svh] flex-col py-4 font-display md:py-6 xl:min-h-[70svh]">
      <InfoPageHeader />
      <div className="container flex flex-1 flex-col py-4 md:py-8 lg:py-12">
        {children}
      </div>
    </div>
  );
}
