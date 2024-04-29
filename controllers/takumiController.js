// Membuat variabel Mahasiswa dan mengimport/required dari model Mahasiswa
const Takumi = require("../models/Takumi");
const Keranjang = require("../models/Keranjang");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter export
module.exports = {
  // Membuat view untuk takumi
  viewTakumi: async (req, res) => {
    try {
      // Membuat variabel mahasiswa, dan menunda eksekusi hingga proses async selesai lalu mengambil model Mahasiswa
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Mahasiswa
      const takumi = await Takumi.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("index", {
        takumi,
        alert,
        title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
      res.redirect("/takumi");
    }
  },

  // Membuat create data untuk takumi
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addTakumi: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
      const { kode_barang, nama, kategori, harga, stok, deskripsi, gambar } =
        req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Mahasiswa
      await Takumi.create({
        kode_barang,
        nama,
        kategori,
        harga,
        stok,
        deskripsi,
        gambar,
      });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Berhasil menambahkan produk Takumi Mart");
      req.flash("alertStatus", "success");
      res.redirect("/takumi"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/takumi");
    }
  },

  // Membuat read data untuk mahasiswa
  // types code in here..

  // Membuat update data untuk mahasiswa
  editTakumi: async (req, res) => {
    try {
      // Mendapatkan data dari body request
      const {
        id,
        kode_barang,
        nama,
        kategori,
        harga,
        stok,
        deskripsi,
        gambar,
      } = req.body;
      // Mencari takumi berdasarkan ID
      const takumi = await Takumi.findOne({ _id: id });
      // Memperbarui data takumi dengan data yang diterima dari body request
      takumi.kode_barang = kode_barang;
      takumi.nama = nama;
      takumi.kategori = kategori;
      takumi.harga = harga;
      takumi.stok = stok;
      takumi.deskripsi = deskripsi;
      takumi.gambar = gambar;
      // Menyimpan perubahan pada takumi
      await takumi.save();
      // Memberikan notifikasi jika data berhasil diperbarui
      req.flash("alertMessage", "Berhasil mengedit produk Takumi Mart");
      req.flash("alertStatus", "success");
      // Mengarahkan kembali ke halaman takumi setelah berhasil mengedit
      res.redirect("/takumi");
    } catch (error) {
      // Memberikan notifikasi jika terjadi kesalahan saat mengedit data
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // Mengarahkan kembali ke halaman takumi
      res.redirect("/takumi");
    }
  },

 // Membuat delete data untuk product
 deleteTakumi: async (req, res) => {
  try {
    const { id } = req.params;
    const takumi = await Takumi.findOne({ _id: id });

    if (!takumi) {
      req.flash("alertMessage", "No product found with that ID");
      req.flash("alertStatus", "danger");
      return res.redirect("/takumi"); // Tambahkan return di sini
    }

    await takumi.deleteOne();
 
    req.flash("alertMessage", "Berhasil hapus data produk");
    req.flash("alertStatus", "warning");
    res.redirect("/takumi");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/takumi");
  }
},
// Membuat view detail produk takumi
viewDetailTakumi: async (req, res) => {
  try {
    // Mendapatkan ID produk dari parameter URL
    const { id } = req.params;
    // Mencari produk berdasarkan ID
    const takumi = await Takumi.findById(id);
    
    // Memeriksa apakah produk ditemukan
    if (!takumi) {
      // Jika tidak ditemukan, kirimkan respon dengan status 404
      return res.status(404).send('Produk tidak ditemukan');
    }

    // Jika produk ditemukan, render view detail_produk dan kirimkan data produk
    res.render('detail_produk', { takumi });
  } catch (error) {
    // Jika terjadi kesalahan, kirimkan respon dengan status 500 dan pesan error
    res.status(500).send('Terjadi kesalahan saat memuat detail produk');
  }
},

// fungsi untuk menambahkan ke keranjang
 // Menambahkan item ke keranjang
 addToCartTakumi: async (req, res) => {
  try {
    // Mendapatkan ID produk dari parameter URL
    const { id } = req.params;
    // Menggunakan ID produk untuk menemukan produk di database
    const takumi = await Takumi.findById(id);

    // Periksa apakah produk ditemukan
    if (!takumi) {
      return res.status(404).send('Produk tidak ditemukan');
    }

    // Dapatkan jumlah produk dari permintaan
    const { quantity } = req.body;

    // Hitung total harga produk
    const totalHarga = takumi.harga * quantity;

    // Simpan detail produk dan jumlahnya ke keranjang
    const itemKeranjang = {
      nama: takumi.nama,
      harga: takumi.harga,
      jumlah: quantity,
      totalHarga: totalHarga
    };

    // Simpan itemKeranjang ke koleksi keranjang
    await Keranjang.create(itemKeranjang);

    // Memberikan notifikasi jika data berhasil diperbarui
    req.flash("alertMessage", "Berhasil menambah ke keranjang Takumi Mart");
    req.flash("alertStatus", "success");
    // Mengarahkan kembali ke halaman takumi setelah berhasil mengedit
    res.redirect("/takumi");
  } catch (error) {
    // Tangani kesalahan
    console.error('Terjadi kesalahan saat menambahkan ke keranjang:', error);
    res.status(500).send('Terjadi kesalahan saat menambahkan ke keranjang');
  }
},
// Membuat fungsi untuk menampilkan semua produk dalam katalog
viewAllProducts: async (req, res) => {
  try {
    // Mengambil semua produk dari database
    const products = await Takumi.find();
    // Render view katalog_produk dan kirimkan data produk
    res.render("katalog_produk", { products });
  } catch (error) {
    // Tangani kesalahan
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat menampilkan katalog produk');
  }
},
getKeranjang: async (req, res) => {
  try {
      // Lakukan logika untuk mengambil data keranjang dari database
      const keranjang = await Keranjang.find(); // Contoh: mengambil semua item keranjang dari MongoDB
      res.json(keranjang);
  } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data keranjang:', error);
      res.status(500).send('Terjadi kesalahan saat mengambil data keranjang');
  }
},
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
