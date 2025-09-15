export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>Private Route</p>

      {children}
    </div>
  );
}
