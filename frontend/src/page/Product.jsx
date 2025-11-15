import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Products from '../components/Product/Products/Products';
import styles from './product02.module.css'; 
import Swipe from "../components/Home/Swipe/Swipe";

function Product() {
    return (
        <div>
            <Helmet>
                <title>Custom Akrilik | Cahaya Acrylic</title>
                <meta
                    name="description"
                    content="Temukan berbagai produk akrilik berkualitas dari Cahaya Acrylic. Mulai dari akrilik bening, akrilik warna, hingga custom sesuai kebutuhan Anda."
                />
                <meta
                    name="keywords"
                    content="produk akrilik, jual akrilik, akrilik bening, akrilik custom, cahaya acrylic"
                />
                <meta property="og:title" content="Produk Akrilik | Cahaya Acrylic" />
                <meta
                    property="og:description"
                    content="Lihat koleksi lengkap produk akrilik Cahaya Acrylic: akrilik bening, warna, dan custom dengan harga terbaik."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://cahaya-acrylic.com/product" />
            </Helmet>

            <Navbar />
            {/* <Hero /> */}
            {/* <Swipe /> */}
            <div className={styles.layout}>
                <Products />
            </div>
            <Footer />
        </div>
    );
}

export default Product;