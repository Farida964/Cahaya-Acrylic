import styles from "./footer.module.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaTiktok, FaWhatsapp, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo_CA}>
           <img className={styles.navbar_logo} src="/logo_CA.jpg" alt="Cahaya Acrylic" /><h3 className={styles.navbar__brand}>Cahaya Acrylic</h3>

        </div>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <p>Jl. Pancasan No.19, Kota Bogor, Jawa Barat (Kantor Utama)</p>
          </div>
          <div className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <p>Jl. Ruko Modern Land, Kota Tangerang, Banten (Cabang Tangerang)</p>
          </div>
          <div className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            <p>+62 811-9584-838</p>
          </div>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <p>admin@cahayaacrylic.com</p>
          </div>
        </div>

        <div className={styles.aboutCompany}>
          <h3>Tentang Kami</h3>
          <p>Cahaya Acrylic adalah tempat terbaik untuk pesanan custom berbahan dasar akrilik seperti keychain, plakat, dan lainnya.</p>
          <div className={styles.socialIcons}>
            <a
            href="https://www.instagram.com/cahaya.acrylic?igsh=MWh6a2RtbHMwaTY3ag=="
            target="_blank"
            rel="noopener noreferrer"
            >
            <FaInstagram />
            </a>

            <a
            href="https://www.tiktok.com/@cahayaacrylic?_t=ZS-8zATG3DVRJ3&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            >
            <FaTiktok />
            </a>

            <a
            href="https://wa.me/628118840838"
            target="_blank"
            rel="noopener noreferrer"
            >
            <FaWhatsapp />
            </a>

            <a
            href="https://www.facebook.com/share/1AuwykwgDB/"
            target="_blank"
            rel="noopener noreferrer"
            >
            <FaFacebook />
            </a>
        </div>

        </div>
        <div className={styles.maps_container}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.330466208772!2d106.79227139999999!3d-6.6057939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5bfa4f9cab9%3A0x148f7c322c4a5bea!2sJl.%20Pancasan%20No.19%2C%20RT.01%2FRW.07%2C%20Pasir%20Jaya%2C%20Kec.%20Bogor%20Bar.%2C%20Kota%20Bogor%2C%20Jawa%20Barat%2016119!5e0!3m2!1sen!2sid!4v1756114563706!5m2!1sen!2sid"
            className={styles.maps}
            title="Cahaya Acrylic - Lokasi"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
