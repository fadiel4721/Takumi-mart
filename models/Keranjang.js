// models/Keranjang.js

const mongoose = require('mongoose');

const keranjangSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  harga: {
    type: Number,
    required: true
  },
  jumlah: {
    type: Number,
    required: true
  },
  totalHarga: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Keranjang = mongoose.model('Keranjang', keranjangSchema);

module.exports = Keranjang;
