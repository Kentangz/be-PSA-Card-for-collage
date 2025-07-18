import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col justify-center items-center">
    <h2 className="text-2xl font-light mb-1">Welcome to PSA Card Submission</h2>
    <div className="w-80">
      {children}
    </div>
  </div>
}
