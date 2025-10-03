import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

// 💤 Lazy Load Komponen Berat
const Swipe = lazy(() => import("../components/Home/Swipe/Swipe"));
const Service = lazy(() => import("../components/Home/Service/Service"));
const TopItem = lazy(() => import("../components/Home/Top_Item/TopItem"));
const Voucher = lazy(() => import("../components/Home/Voucher/Voucher"));
const WhatsApp = lazy(() => import("../components/Home/WhatsApp/WhatsApp"));
const Klien = lazy(() => import("../components/Home/Klien/Klien"));
const Footer = lazy(() => import("../components/Footer/Footer"));

function Home() {
  return (
    <div>
      {/* 🧠 SEO Helmet Section */}
      <Helmet>
        <title>
          Custom Acrylic & Akrilik Cutting Murah Jabodetabek | Cahaya Acrylic
        </title>
        <meta
          name="description"
          content="Cahaya Acrylic menjual berbagai jenis akrilik bening, warna, dan custom dengan harga terbaik. Melayani wilayah Jabodetabek untuk kebutuhan rumah, kantor, dan dekorasi."
        />
        <meta
          name="keywords"
          content="custom acrylic jabodetabek, akrilik bening, cutting acrylic murah, plakat akrilik, gantungan kunci acrylic, toko akrilik bogor, toko acrylic jakarta"
        />
        <meta name="author" content="Cahaya Acrylic" />
        <link rel="canonical" href="https://cahaya-acrylic.com/" />

        {/* 🟦 Open Graph */}
        <meta
          property="og:title"
          content="Custom Acrylic & Akrilik Cutting Murah Jabodetabek | Cahaya Acrylic"
        />
        <meta
          property="og:description"
          content="Jual akrilik bening, warna, dan custom dengan harga terbaik. Hanya di Cahaya Acrylic."
        />
        <meta property="og:image" content="https://cahaya-acrylic.com/logo_CA.jpg" />
        <meta property="og:url" content="https://cahaya-acrylic.com/" />
        <meta property="og:type" content="website" />

        {/* 🐦 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Custom Acrylic & Akrilik Cutting Murah Jabodetabek | Cahaya Acrylic"
        />
        <meta
          name="twitter:description"
          content="Tempat jual akrilik terpercaya: bening, warna, dan custom."
        />
        <meta
          name="twitter:image"
          content="https://cahaya-acrylic.com/logo_CA.jpg"
        />

        {/* 🏪 Schema.org LocalBusiness */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Cahaya Acrylic",
          "image": "https://cahaya-acrylic.com/logo_CA.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jabodetabek",
            "addressCountry": "ID"
          },
          "url": "https://cahaya-acrylic.com",
          "telephone": "+62 811-8840-838",
          "description": "Jual acrylic lembaran, custom acrylic, dan piala acrylic wilayah Jabodetabek."
        }
        `}</script>
      </Helmet>

      {/* ✅ Header & Hero Section */}
      <Navbar />
      <Suspense fallback={<div style={{ textAlign: "center", padding: "30px" }}>Loading...</div>}>
        <Swipe />

        <section className="hero-section" style={{ padding: "20px", textAlign: "center" }}>
          <h1>Custom Acrylic & Akrilik Cutting Murah Jabodetabek</h1>
          <p>
            Cahaya Acrylic melayani pembuatan & penjualan <strong>akrilik custom</strong>, 
            <strong> akrilik bening</strong>, dan berbagai produk acrylic berkualitas untuk kebutuhan rumah, 
            kantor, maupun dekorasi. Harga terjangkau — pelayanan cepat dan profesional.
          </p>
          <Link to="/product" className="btn-utama">
            Lihat Produk Kami
          </Link>
        </section>

        {/* ✅ Konten Utama */}
        <Service />
        <TopItem />
        <Voucher />
        <WhatsApp />
        <Klien />
        <Footer />
      </Suspense>
    </div>
  );
}

export default Home;
