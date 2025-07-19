export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-screen-2xl flex flex-col m-auto px-4 bg-">
    {children}
  </div>
}
