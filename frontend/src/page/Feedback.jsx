import { Helmet } from "react-helmet-async";
import React, { Suspense, lazy } from "react";
import Navbar from "../components/Navbar/Navbar";
import Swipe from "../components/Home/Swipe/Swipe";
import Footer from "../components/Footer/Footer";

// 💤 Lazy load komponen Review
const Review = lazy(() => import("../components/Feedback/Review/Review"));

function Feedback() {
  return (
    <div>
      {/* 🧠 SEO Helmet Section */}
      <Helmet>
        <title>Feedback Pelanggan | Cahaya Acrylic</title>
        <meta
          name="description"
          content="Lihat ulasan dan pengalaman pelanggan yang sudah menggunakan produk akrilik dari Cahaya Acrylic. Kepuasan Anda adalah prioritas kami."
        />
        <meta
          name="keywords"
          content="feedback akrilik, review pelanggan, ulasan akrilik, cahaya acrylic"
        />
        <link rel="canonical" href="https://cahaya-acrylic.com/feedback" />

        {/* 🟦 Open Graph */}
        <meta property="og:title" content="Feedback Pelanggan | Cahaya Acrylic" />
        <meta
          property="og:description"
          content="Testimoni pelanggan Cahaya Acrylic tentang kualitas produk akrilik kami."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cahaya-acrylic.com/feedback" />
        <meta property="og:image" content="https://cahaya-acrylic.com/logo_CA.jpg" />

        {/* 🐦 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Feedback Pelanggan | Cahaya Acrylic" />
        <meta
          name="twitter:description"
          content="Testimoni pelanggan Cahaya Acrylic tentang kualitas produk akrilik kami."
        />
        <meta name="twitter:image" content="https://cahaya-acrylic.com/logo_CA.jpg" />
      </Helmet>

      {/* ✅ Halaman Konten */}
      <Navbar />
      <Swipe />

      {/* 🌀 Suspense untuk handle loading komponen Review */}
      <Suspense fallback={<div style={{ textAlign: "center", padding: "20px" }}>Memuat ulasan...</div>}>
        <Review />
      </Suspense>

      <Footer />
    </div>
  );
}

export default Feedback;
