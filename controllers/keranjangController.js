// controllers/keranjangController.js

const Keranjang = require('../models/Keranjang');

module.exports = {
  // Menampilkan daftar produk di keranjang
  viewKeranjang: async (req, res) => {
    try {
      // Mengambil semua data dari koleksi keranjangs
      const items = await Keranjang.find();
      // Mengirimkan data ke view untuk ditampilkan
      res.render('keranjang', { items });
    } catch (error) {
      console.error('Terjadi kesalahan saat menampilkan keranjang:', error);
      res.status(500).send('Terjadi kesalahan saat menampilkan keranjang');
    }
  },

  // Menghapus produk dari keranjang
  deleteFromCart: async (req, res) => {
    try {
      // Mendapatkan ID produk dari parameter URL
      const { id } = req.params;
      // Menghapus produk dari keranjang berdasarkan ID
      await Keranjang.findByIdAndDelete(id);
      // Mengirimkan respons berhasil
      res.send('Produk berhasil dihapus dari keranjang');
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus dari keranjang:', error);
      res.status(500).send('Terjadi kesalahan saat menghapus dari keranjang');
    }
  },
 

};
