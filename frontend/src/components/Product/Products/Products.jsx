import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import Detail from "../../Home/Detail/Detail";
import styles from "./Products.module.css";
// import Whatsapp from '../../Home/WhatsApp/WhatsApp'; // Komponen ini tidak digunakan di sini, bisa dihapus

function Products() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Products"); // Default value
    const [selectedItem, setSelectedItem] = useState(null);

    const handleBuyNow = (item) => {
        const phone = '081113801838';
        const message = `Halo, saya ingin membeli produk ${item.title}.`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/json/item.json");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    
    // Perbarui logika filter agar "All Products" menampilkan semua
    const filteredProducts = selectedCategory && selectedCategory !== "All Products"
        ? products.filter((p) => p.kategori === selectedCategory)
        : products;

    const handleCategoryClick = (kategori) => {
        setSelectedCategory(kategori || "All Products");
    };

    const handleDetailClick = (item) => {
        setSelectedItem(item);
    };

    const closePopup = () => {
        setSelectedItem(null);
    };

    return (
        <div className={styles.container}>
            {/* Sidebar dengan callback kategori */}
            <Sidebar onCategoryClick={handleCategoryClick} className={styles.sidebar_factory} />
            
            {/* Wrapper untuk konten utama di sebelah kanan sidebar */}
            <main className={styles.main_content}>
                {/* Header Halaman */}
                <div className={styles.page_header}>
                    <h1>{selectedCategory}</h1>
                    <p>Showing {filteredProducts.length} of {products.length} products</p>
                </div>

                <div className={styles.grid}>
                    {filteredProducts.map((product, idx) => (
                        <div key={idx} className={styles.card}>
                            <img
                                src={product.img}
                                alt={product.title}
                                className={styles.image}
                            />
                            <h3 className={styles.title}>{product.title}</h3>
                            <div className={styles.priceRow}>
                                <span className={styles.price}>Rp {product.price}</span>
                            </div>
                            <div className={styles.rating}>
                                ⭐⭐⭐⭐⭐ <span>5.0</span>
                            </div>
                            <div className={styles.actions}>
                                <button
                                    className={styles.buyBtn}
                                    onClick={() => handleBuyNow(product)}
                                >
                                    Buy
                                </button>
                                <button
                                    className={styles.button_detail}
                                    onClick={() => handleDetailClick(product)}
                                >
                                    Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* tampilkan Detail kalau ada item yang dipilih */}
            {selectedItem && <Detail item={selectedItem} onClose={closePopup} />}
        </div>
    );
}

export default Products;