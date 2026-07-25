import SideBar from "@/components/SideBar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SideBar />

      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}