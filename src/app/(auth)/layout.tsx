export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF9FD] via-white to-[#F1F0FF]">
      {children}
    </div>
  );
}
