import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col justify-center items-center">
    <div>
      {children}
    </div>
  </div>
}
