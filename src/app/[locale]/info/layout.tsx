import { InfoPageHeader } from "@/components/infoPageHeader";

interface Props {
  children: React.ReactNode;
}
export default function InfoPageLayout({ children }: Props) {
  return (
    <div className="min-h-[50svh] py-4 font-display md:py-6">
      <InfoPageHeader />
      <div className="container py-4 md:py-8 lg:py-12">{children}</div>
    </div>
  );
}
