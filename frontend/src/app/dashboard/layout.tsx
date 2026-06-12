import { ServiceProvider } from "@/store/ServiceContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServiceProvider>
      {children}
    </ServiceProvider>
  );
}