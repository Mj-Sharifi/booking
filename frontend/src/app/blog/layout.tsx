
export default function rootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="pt-32">{children}</main>;
}
