export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container pt-8 font-sans">{children}</main>;
}
