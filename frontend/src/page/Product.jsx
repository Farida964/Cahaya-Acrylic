import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./product02.module.css";

// 💤 Lazy load komponen berat
const Navbar = lazy(() => import("../components/Navbar/Navbar"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Products = lazy(() => import("../components/Product/Products/Products"));
const Swipe = lazy(() => import("../components/Home/Swipe/Swipe"));

function Product() {
  return (
    <>
      {/* 🧠 SEO Helmet Section */}
      <Helmet>
        <title>Produk Akrilik Custom & Lembaran | Cahaya Acrylic</title>
        <meta
          name="description"
          content="Temukan berbagai produk akrilik berkualitas dari Cahaya Acrylic: akrilik bening, warna, dan custom cutting sesuai kebutuhan Anda. Harga terjangkau, pelayanan cepat!"
        />
        <meta
          name="keywords"
          content="produk akrilik, jual akrilik, akrilik bening, akrilik warna, akrilik custom, acrylic sheet, plakat akrilik, Cahaya Acrylic"
        />
        <meta name="author" content="Cahaya Acrylic" />
        <link rel="canonical" href="https://cahaya-acrylic.com/product" />

        {/* 🟦 Open Graph Meta */}
        <meta property="og:title" content="Produk Akrilik Custom & Lembaran | Cahaya Acrylic" />
        <meta property="og:description" content="Lihat koleksi lengkap produk akrilik Cahaya Acrylic: akrilik bening, warna, dan custom dengan harga terbaik." />
        <meta property="og:image" content="https://cahaya-acrylic.com/logo_CA.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cahaya-acrylic.com/product" />

        {/* 🐦 Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Produk Akrilik Custom & Lembaran | Cahaya Acrylic" />
        <meta name="twitter:description" content="Jual akrilik lembaran, bening, warna, dan custom cutting untuk segala kebutuhan." />
        <meta name="twitter:image" content="https://cahaya-acrylic.com/logo_CA.jpg" />
      </Helmet>

      {/* 🧭 Konten Utama dengan Suspense Fallback */}
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <Navbar />
        <Swipe />

        <header className={styles.pageHeader}>
          <h1>Produk Akrilik Cahaya Acrylic</h1>
          <p>
            Pilih berbagai produk <strong>akrilik custom</strong>,{" "}
            <strong>akrilik lembaran</strong>, dan <strong>cutting acrylic</strong> 
            sesuai kebutuhan rumah, kantor, atau dekorasi Anda.
          </p>
        </header>

        <main className={styles.layout}>
          <Products />
        </main>

        <Footer />
      </Suspense>
    </>
  );
}

export default Product;
