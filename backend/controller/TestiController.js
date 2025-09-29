import Testi from "../models/TestiModel.js";
import { put } from '@vercel/blob';

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
    const { nama, kota, deskripsi, rating } = req.body;
    let fotoUrl = null;

    if (req.file) {
      const { url } = await put(req.file.originalname, req.file.buffer, { access: 'public' });
      fotoUrl = url;
    }

    await Testi.create({ nama, kota, deskripsi, foto: fotoUrl, rating });
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

    const { nama, kota, deskripsi, rating } = req.body;
    let fotoUrl = testi.foto;

    if (req.file) {
      const { url } = await put(req.file.originalname, req.file.buffer, { access: 'public' });
      fotoUrl = url;
    }

    await testi.update({ nama, kota, deskripsi, foto: fotoUrl, rating });
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
