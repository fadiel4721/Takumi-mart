// routes/keranjang.js

const express = require('express');
const router = express.Router();
const keranjangController = require('../controllers/keranjangController');

// Menampilkan daftar produk di keranjang
router.get('/', keranjangController.viewKeranjang);

// Menghapus produk dari keranjang
router.delete('/:id', keranjangController.deleteFromCart);

module.exports = router;
