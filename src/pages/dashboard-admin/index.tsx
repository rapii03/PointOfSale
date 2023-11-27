import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard Admin</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <AdminLayout>
          <p className="text-[#FF6B35] font-bold text-2xl mt-2">Dashboard</p>
        </AdminLayout>
      </main>
    </div>
  );
}
