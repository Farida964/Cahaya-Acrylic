import multer from "multer";

// Konfigurasi simpan di memory
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
