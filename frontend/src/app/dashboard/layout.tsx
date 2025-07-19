export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-screen-2xl flex flex-col m-auto px-4 bg-">
    <div className="w-full pl-62 mt-4">
      <div className="h-14 flex justify-between items-center px-2">
        <p className="text-xl font-medium">dashboard</p>
        <div className="h-8 w-8 bg-neutral-500 rounded-full"></div>
      </div>
    </div>
    {children}
  </div>
}
