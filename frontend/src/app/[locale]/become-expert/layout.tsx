export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="py-22 flex flex-col">
      {children}
    </section>
  );
}
