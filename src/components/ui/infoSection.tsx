interface Props {
  header: string;
  children: React.ReactNode;
}
export default function InfoSection({ header, children }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold uppercase text-brand-blue">{header}</h3>
      <div>{children}</div>
    </div>
  );
}
