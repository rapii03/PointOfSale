import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import FormTambahProdukAdmin from "@/components/formTambahProdukAdmin";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function FormTambahProdukAdminPage() {
  const crumbs = [
    { text: "Home", href: "/dashboard-admin" },
    { text: "Inventori", href: "/inventori/produk" },
    { text: "Produk", href: "/inventori/produk" },
    { text: "Tambah" },
  ];
  return (
    <div>
      <Head>
        <title>Tambah Produk</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.0.0/datepicker.min.js"></script> */}
        <AdminLayout>
          <Breadcrumbs crumbs={crumbs} />
          <FormTambahProdukAdmin />
        </AdminLayout>
      </main>
    </div>
  );
}
