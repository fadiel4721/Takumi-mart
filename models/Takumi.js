const mongoose = require("mongoose");

// Membuat skema untuk data toko Takumi Mart
const takumiScheme = new mongoose.Schema({
  kode_barang: {
    type: Number,
    required: true,
    unique: true,
  },
  nama: {
    type: String,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  stok: {
    type: Number,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  gambar: {
    type: String, // Anda dapat menggunakan tipe String untuk menyimpan nama file gambar atau URL gambar
    required: true,
  },
});

// Membuat model Takumi Mart dari skema yang telah dibuat
const Takumi = mongoose.model("Takumi", takumiScheme);

// Mengekspor model Takumi Mart agar bisa digunakan di file lain
module.exports = Takumi;
