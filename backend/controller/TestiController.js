import Testi from "../models/TestiModel.js";

// Get all testimonials
export const getTesti = async (req, res) => {
  try {
    const response = await Testi.findAll();
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get testimonial by id
export const getTestiById = async (req, res) => {
  try {
    const response = await Testi.findOne({
      where: { id: req.params.id }
    });
    if (!response) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create testimonial
export const createTesti = async (req, res) => {
  try {
    const { nama, kota, deskripsi, rating } = req.body; // ✅ ambil rating juga
    const foto = req.file ? req.file.filename : null;

    await Testi.create({ nama, kota, deskripsi, foto, rating }); // ✅ simpan rating
    res.status(201).json({ msg: "Testimoni berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update testimonial
export const updateTesti = async (req, res) => {
  try {
    const testi = await Testi.findOne({ where: { id: req.params.id } });
    if (!testi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { nama, kota, deskripsi, rating } = req.body; // ✅ ambil rating juga
    const foto = req.file ? req.file.filename : testi.foto;

    await testi.update({ nama, kota, deskripsi, foto, rating }); // ✅ update rating
    res.json({ msg: "Testimoni berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// Delete testimonial
export const deleteTesti = async (req, res) => {
  try {
    const testi = await Testi.findOne({ where: { id: req.params.id } });
    if (!testi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    await testi.destroy();
    res.json({ msg: "Testimoni berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
