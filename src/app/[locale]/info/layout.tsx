import { InfoPageHeader } from "@/components/infoPageHeader";

interface Props {
  children: React.ReactNode;
}
export default function InfoPageLayout({ children }: Props) {
  return (
    <div className="flex h-full flex-col place-self-stretch self-stretch py-4 font-display">
      <InfoPageHeader />
      <div className="container flex flex-1 flex-col py-4 md:py-8 lg:py-12">
        {children}
      </div>
    </div>
  );
}
