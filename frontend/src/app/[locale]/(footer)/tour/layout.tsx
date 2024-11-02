
export default function TourLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="container mx-auto py-28 lg:py-28 px-2 md:px-4 flex flex-col">
      {children}
    </section>
  );
}
