// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const takumiController = require("../controllers/takumiController");

// endpoint takumi
router.get("/", takumiController.viewTakumi); // Untuk view
router.post("/", takumiController.addTakumi); // untuk menambahkan data produk takumi
router.put("/", takumiController.editTakumi); // untuk edit data produk takumi
router.delete("/:id", takumiController.deleteTakumi); // untuk hapus data produk takumi
router.get('/:id', takumiController.viewDetailTakumi); // untuk menampilkan detail produk
////untuk menampilkan data keranjang
router.post('/:id/keranjang', takumiController.addToCartTakumi);
router.get("/katalog_produk", takumiController.viewAllProducts); // Rute untuk menampilkan semua produk dalam katalog
router.get('/keranjang', takumiController.getKeranjang);


// Lalu export routernya
module.exports = router;
