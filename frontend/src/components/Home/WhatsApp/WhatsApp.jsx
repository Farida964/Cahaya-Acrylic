import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsApp.module.css';

function Whatsapp() {
  const phoneNumber = '628119584838'; 
  const message = 'Hallo Cahaya Acrylic, saya ingin menanyakan tentang produk Anda. [Silakan isi pertanyaan Anda di sini]';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappURL} className={styles.whatsappButton} target="_blank" rel="noopener noreferrer">
      <FaWhatsapp className={styles.icon} />
      <span>Contact us</span>
    </a>
  );
}

export default Whatsapp;
