import React, { useEffect, useState, useRef } from "react"; // ⬅️ tambahkan useRef
import axios from "axios";
import styles from "./review.module.css";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    kota: "",
    deskripsi: "",
    foto: null,
    rating: 0,
  });

  const sliderRef = useRef(null); // ⬅️ ref untuk list review

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("https://api.cahaya-acrylic.com/testi");
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  const handleStarClick = (index) => {
    setFormData({ ...formData, rating: index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.kota || !formData.deskripsi) {
      alert("Lengkapi semua field sebelum submit!");
      return;
    }

    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("kota", formData.kota);
    data.append("deskripsi", formData.deskripsi);
    data.append("rating", formData.rating);
    if (formData.foto) data.append("foto", formData.foto);

    try {
      await axios.post("https://api.cahaya-acrylic.com/testi", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchReviews();
      setFormData({ nama: "", kota: "", deskripsi: "", foto: null, rating: 0 });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  // === AUTO SLIDER (Review List) ===
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || reviews.length === 0) return;

    let animationFrame;
    let scrollSpeed = 0.5;
    let isPaused = false;

    const canScroll = () => slider.scrollWidth > slider.clientWidth + 1;

    const autoScroll = () => {
      if (isPaused || !canScroll()) return;

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft + scrollSpeed >= maxScrollLeft) {
        slider.scrollLeft = 0; // reset ke awal
      } else {
        slider.scrollLeft += scrollSpeed;
      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    const startScroll = () => {
      stopScroll();
      if (canScroll()) {
        isPaused = false;
        animationFrame = requestAnimationFrame(autoScroll);
      }
    };

    const stopScroll = () => {
      isPaused = true;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    startScroll();

    slider.addEventListener("mouseenter", stopScroll);
    slider.addEventListener("mouseleave", startScroll);
    slider.addEventListener("touchstart", stopScroll);
    slider.addEventListener("touchend", startScroll);
    window.addEventListener("resize", startScroll);

    return () => {
      stopScroll();
      slider.removeEventListener("mouseenter", stopScroll);
      slider.removeEventListener("mouseleave", startScroll);
      slider.removeEventListener("touchstart", stopScroll);
      slider.removeEventListener("touchend", startScroll);
      window.removeEventListener("resize", startScroll);
    };
  }, [reviews]);

  return (
    <div className={styles.container}>
      <section className={styles.Package}>
        <div className={styles.sub_historyItem}>
          <h2 className={styles.list_historyItem}>What Our Customer Say</h2>
        </div>
        <span className={styles.wordItem}> See and share your review!</span>

        {/* Bagian Review Cards Auto Slide */}
        <div className={styles.review_list} ref={sliderRef}>
          {reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <div className={styles.review_card} key={index}>
                <div className={styles.review_imageWrapper}>
                  {rev.foto ? (
                    <img
                      src={`https://api.cahaya-acrylic.com/uploads/${rev.foto}`}
                      alt={rev.nama}
                      className={styles.review_image}
                    />
                  ) : (
                    <div className={styles.image_placeholder}></div>
                  )}
                </div>

                <div className={styles.review_content}>
                  <p className={styles.review_name}>
                    <strong>
                      {rev.nama} {rev.kota ? `(${rev.kota})` : ""}
                    </strong>
                  </p>
                    <p className={styles.review_text}>{rev.deskripsi}</p>
                </div>

                <div className={styles.review_rating}>
                  <span className={styles.stars}>
                    {"★".repeat(rev.rating || 0)}
                    {"☆".repeat(5 - (rev.rating || 0))}
                  </span>
                  <span className={styles.rating_number}>
                    {(rev.rating || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>Belum ada review.</p>
          )}
        </div>
      </section>

      {/* Form Review (tetap statis) */}
      <section className={styles.Package}>
        <div className={styles.sub_historyItem}>
          <h2 className={styles.list_historyItem}>Give a Review</h2>
        </div>
        <span className={styles.wordItem}>
          Your experience will mean a lot to us!
        </span>

        <form onSubmit={handleSubmit} className={styles.feedback_card}>
          <h3 className={styles.formTitle}>
            Apakah kamu puas dengan produk kami?
          </h3>

          {/* Rating */}
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className={
                  index <= formData.rating ? styles.starActive : styles.star
                }
                onClick={() => handleStarClick(index)}
              >
                ★
              </span>
            ))}
          </div>

          <div className={styles.input_feedback}>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama kamu"
              className={styles.inputText}
            />
            <input
              type="text"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              placeholder="Kota asal"
              className={styles.inputText}
            />
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Ceritakan pengalaman kamu di sini..."
              rows={4}
              className={styles.textarea}
            />
          </div>

          {/* Upload Foto */}
          <div className={styles.actionGroup}>
            <label className={styles.upload_label}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              Add Photo
            </label>
            <button type="submit" className={styles.shareBtn}>
              Share Your Experience
            </button>
          </div>

          {formData.foto && (
            <p className={styles.previewText}>
              Foto terpilih: {formData.foto.name}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};

export default Review;
