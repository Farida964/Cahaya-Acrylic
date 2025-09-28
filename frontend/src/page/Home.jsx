import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TopItem from "../components/Home/Top_Item/TopItem";
import Voucher from "../components/Home/Voucher/Voucher";
// import TopPack from "../components/Home/Top_Pack/TopPack";
import WhatsApp from "../components/Home/WhatsApp/WhatsApp";
// import styles from "./home.module.css";
import { Link } from "react-router-dom";
import Service from "../components/Home/Service/Service";
import Swipe from "../components/Home/Swipe/Swipe";
import Klien from "../components/Home/Klien/Klien";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Custom Acrylic | Akrilik Custom, Cutting Acrylic, Pembuatan Akrilik, Toko Akrilik</title>
        <meta
          name="description"
          content="Cahaya Acrylic menjual berbagai jenis akrilik: akrilik bening, warna, dan custom dengan harga terbaik untuk kebutuhan rumah, kantor, dan dekorasi."
        />
        <meta
          name="keywords"
          content="cahaya acrylic, jual akrilik, akrilik bening, akrilik custom, harga akrilik murah, acrylic custom, custom acrylic, akrilik custom, custom akrilik, akrilik, acrylic, akrilik bogor, akrilik terdekat, plakat akrilik, jual akrilik, toko akrilik, toko acrylic, cutting acrylic, cutting akrilik, akrilik cutting, gantungan kunci, gantungan kunci acrylic, gantungan kunci akrilik"
        />
        <meta
          property="og:title"
          content="Cahaya Acrylic | Akrilik Custom, Cutting Acrylic"
        />
        <meta
          property="og:description"
          content="Tempat jual akrilik terpercaya: bening, warna, dan custom dengan harga terbaik. Hanya di Cahaya Acrylic."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cahaya-acrylic.com/" />
      </Helmet>

      <Navbar />
      <Swipe />
      <Service />
      
      <TopItem />
      <Voucher />
      {/* <TopPack /> */}
      <WhatsApp />
      <Klien />
      <Footer />
    </div>
  );
}

export default Home;