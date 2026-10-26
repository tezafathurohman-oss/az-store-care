import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, Search, Star, Heart, Filter, ChevronRight, X, Plus, Minus, 
  Truck, ShieldCheck, Clock, Headphones, CheckCircle, ArrowRight, MessageSquare, 
  Trash2, CreditCard, Wallet, Smartphone, ChevronDown, Check, Eye, Sparkles,
  Zap, Droplets, Wind, ShieldAlert, Award, BookOpen
} from 'lucide-react';

// Specialized Shoe Care & Sports Socks Product Data
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "AZ Kick Care Premium Shoe Cleaner Kit (250ml + Soft Brush)",
    category: "Shoe Cleaner / Kick Care",
    price: 129000,
    originalPrice: 169000,
    rating: 4.9,
    reviewsCount: 342,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    badge: "Best Seller",
    discount: "23%",
    description: "Formula pembersih sepatu konsentrat berbahan dasar alami (Jojoba Oil & Coconut extract) yang aman untuk semua bahan (Canvas, Suede, Leather, Mesh, & Primeknit). Menghilangkan noda membandel tanpa merusak warna dan serat bahan.",
    scents: ["Original Fresh", "Bubblegum", "Coffee Bean"],
    sizes: [],
    colors: [],
    inStock: true,
    features: ["Aman untuk Suede & Primeknit", "98% Natural Ingredients", "Sudah Termasuk Standard Brush", "Kapasitas 250ml (hingga 50 pasang)"]
  },
  {
    id: 2,
    name: "AZ Anti-Bacterial Shoe Deodorizer Spray (100ml)",
    category: "Spray & Deodorizer",
    price: 59000,
    originalPrice: 85000,
    rating: 4.8,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&auto=format&fit=crop&q=80",
    badge: "Must Have",
    discount: "30%",
    description: "Spray pembasmi kuman dan bakteri penyebab bau ketiak & sepatu. Dilengkapi aroma minyak esensial alami yang tahan hingga 24 jam. Cukup semprot 2-3x sebelum/sesudah berolahraga.",
    scents: ["Aroma Kopi Hitam", "Lemon Fresh Citrus", "Clean Cotton"],
    sizes: [],
    colors: [],
    inStock: true,
    features: ["Membunuh 99.9% Bakteri", "Kering Dalam 10 Detik", "Aroma Alami Tahan Lama", "Ukuran Travel Friendly 100ml"]
  },
  {
    id: 3,
    name: "AZ Sports Socks Cushion Crew (Tebal Anti-Slip - Pack of 3)",
    category: "Kaos Kaki Olahraga",
    price: 89000,
    originalPrice: 120000,
    rating: 4.9,
    reviewsCount: 410,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&auto=format&fit=crop&q=80",
    badge: "Terlaris",
    discount: "25%",
    description: "Kaos kaki olahraga tinggi medium (Crew) dengan bantalan ekstra (Terry Cushioning) di tumit & telapak kaki. Mengurangi guncangan saat berlari, gym, futsal, atau basket.",
    sizes: ["M (38-41)", "L (42-45)"],
    colors: ["Black-White Mix", "Full Black", "Full White"],
    scents: [],
    inStock: true,
    features: ["Busa Terry Tebal & Empuk", "Fitur Anti-Slip Telapak", "Mesh Breathable Atas", "Bahan Combed Cotton Premium"]
  },
  {
    id: 4,
    name: "AZ Sports Compression Performance Socks (Kaos Kaki Lari & Gym)",
    category: "Kaos Kaki Olahraga",
    price: 65000,
    originalPrice: 95000,
    rating: 4.8,
    reviewsCount: 180,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80",
    badge: "Pro Series",
    discount: "31%",
    description: "Kaos kaki kompresi tingkat sedang untuk memperlancar sirkulasi darah otot betis & pergelangan kaki. Sangat cocok untuk pelari maraton, pemain badminton, dan latihan intensif.",
    sizes: ["S/M (36-40)", "L/XL (41-45)"],
    colors: ["Neon Cyan", "Stealth Black", "Electric Red"],
    scents: [],
    inStock: true,
    features: ["Gradient Compression", "Mengurangi Pegal & Kram Otot", "Quick-Dry Elastic Material", "Arch Support Grip"]
  },
  {
    id: 5,
    name: "AZ Microfiber Towel & Premium Horsehair Brush Care Combo",
    category: "Care Bundles & Accessories",
    price: 75000,
    originalPrice: 110000,
    rating: 4.7,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80",
    badge: "Hemat",
    discount: "31%",
    description: "Kombinasi sikat bulu kuda asli (Horsehair Brush) super lembut khusus bahan sensitif seperti Suede, Leather & Mesh, plus Lap Mikrofiber ultra-serap air.",
    sizes: [],
    colors: [],
    scents: [],
    inStock: true,
    features: ["Bulu Kuda Asli Super Halus", "Tidak Merusak Material Suede", "Lap Mikrofiber High Density 40x40cm", "Gagang Kayu Mahoni Ergonomis"]
  },
  {
    id: 6,
    name: "AZ Water & Stain Repellent Spray (Nano Shield Protector 250ml)",
    category: "Spray & Deodorizer",
    price: 115000,
    originalPrice: 155000,
    rating: 4.9,
    reviewsCount: 288,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
    badge: "Popular",
    discount: "25%",
    description: "Semprotan efek daun talas (Lotus Effect) berbasis Nano Technology. Melindungi sepatu dari cipratan air, lumpur, saus, dan noda minyak hingga 3-4 minggu sekali semprot.",
    sizes: [],
    colors: [],
    scents: [],
    inStock: true,
    features: ["Efek Daun Talas Waterproof", "Tidak Mengubah Warna Sepatu", "Bertahan Hingga 30 Hari", "Aman Untuk Bahan Apapun"]
  },
  {
    id: 7,
    name: "AZ Ankle Sports Socks Anti-Bakteri (Kaos Kaki Pendek - Pack of 5)",
    category: "Kaos Kaki Olahraga",
    price: 79000,
    originalPrice: 115000,
    rating: 4.8,
    reviewsCount: 320,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&auto=format&fit=crop&q=80",
    badge: "Value Pack",
    discount: "31%",
    description: "Kaos kaki semata kaki (Ankle) anti-bau dengan teknologi serat perak (Silver Ion) pembasmi kuman. Ringan, menyerap keringat dengan cepat, dan pas untuk sneakers harian & olahraga.",
    sizes: ["All Size (37-44)"],
    colors: ["Multicolor Pack", "All Black", "All White"],
    scents: [],
    inStock: true,
    features: ["Teknologi Silver-Ion Anti Bau", "Karet Rib Elastis Anti Melorot", "Bahan Cotton Bamboo Adem", "Paket Ekonomis Isi 5 Pasang"]
  },
  {
    id: 8,
    name: "AZ Ultimate Shoe Care Complete Box Set (Kick Care Master Kit)",
    category: "Care Bundles & Accessories",
    price: 289000,
    originalPrice: 399000,
    rating: 5.0,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80",
    badge: "Ultimate Gift",
    discount: "27%",
    description: "Paket perawatan sepatu paling komplit dalam hardbox eksklusif! Berisi: 250ml Cleaner + Hard Brush + Soft Horsehair Brush + Deodorizer + Repellent Spray + Lap Mikrofiber + Shoe Tree.",
    sizes: [],
    colors: [],
    scents: ["Aroma Fresh Lemon Kit", "Aroma Coffee Kit"],
    inStock: true,
    features: ["Set Lengkap Pembersih & Pelindung", "Termasuk Shoe Tree Penjaga Bentuk Sepatu", "Kemasan Hardbox Gift Premium", "Hemat Hingga 110rb dibanding Beli Eceran"]
  }
];

// Helper Format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

export default function App() {
  // Navigation & Filter State
  const [activeCategory, setActiveCategory] = useState("Semua Produk");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  
  // Modal & Cart State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Product Selection Variations
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedScent, setSelectedScent] = useState("");

  // Promo Code State
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  // Checkout Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    courier: "JNE - Reguler (2-3 Hari)",
    payment: "QRIS / E-Wallet",
    notes: ""
  });

  // Shipping Cost Config
  const courierOptions = {
    "JNE - Reguler (2-3 Hari)": 18000,
    "J&T Express - Fast (1-2 Hari)": 24000,
    "SiCepat Best (1 Hari)": 26000,
    "GoSend / Grab Instant": 35000
  };

  // Toast Trigger Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle Wishlist
  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast("Dihapus dari favorit");
    } else {
      setWishlist([...wishlist, productId]);
      showToast("Ditambahkan ke produk favorit ❤️");
    }
  };

  // Add to Cart Logic
  const addToCart = (product, size = null, color = null, scent = null, e = null) => {
    if (e) e.stopPropagation();

    const chosenSize = size || (product.sizes?.length > 0 ? product.sizes[0] : null);
    const chosenColor = color || (product.colors?.length > 0 ? product.colors[0] : null);
    const chosenScent = scent || (product.scents?.length > 0 ? product.scents[0] : null);

    const cartKey = `${product.id}-${chosenSize || ''}-${chosenColor || ''}-${chosenScent || ''}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartKey === cartKey);
      if (existing) {
        return prev.map(item =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        ...product,
        cartKey,
        selectedSize: chosenSize,
        selectedColor: chosenColor,
        selectedScent: chosenScent,
        quantity: 1
      }];
    });

    showToast(`"${product.name.substring(0, 30)}..." masuk keranjang! 🧼`);
  };

  // Update Cart Quantity
  const updateQuantity = (cartKey, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartKey === cartKey) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  // Remove item from Cart
  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(item => item.cartKey !== cartKey));
    showToast("Barang dihapus dari keranjang");
  };

  // Coupon Voucher Check
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === "AZCLEAN20") {
      setAppliedDiscount(20000);
      setCouponError("");
      showToast("Kupon AZCLEAN20 berhasil dipasang (-Rp 20.000) 🎉");
    } else if (couponInput.trim().toUpperCase() === "KICKFREE") {
      setAppliedDiscount(15000);
      setCouponError("");
      showToast("Kupon KICKFREE berhasil dipasang! 🎉");
    } else {
      setCouponError("Kode kupon tidak valid. Coba: AZCLEAN20");
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(product => {
      const matchesCategory = activeCategory === "Semua Produk" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // default
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const autoDiscount = cartSubtotal >= 200000 ? 15000 : 0; // Auto discount >200k
  const totalDiscount = autoDiscount + appliedDiscount;
  const shippingCost = courierOptions[formData.courier] || 18000;
  const cartTotal = Math.max(0, cartSubtotal - totalDiscount + (cartItems.length > 0 ? shippingCost : 0));
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Send Order via WhatsApp
  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Keranjang belanja Anda masih kosong!");
      return;
    }
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Mohon isi Nama, No WhatsApp, dan Alamat Lengkap Anda.");
      return;
    }

    let message = `*PEMESANAN BARU - AZ STORE CARE* 🧼🧦\n\n`;
    message += `*Data Pembeli:*\n`;
    message += `👤 Nama: ${formData.name}\n`;
    message += `📞 No. WA: ${formData.phone}\n`;
    message += `📍 Alamat Kirim: ${formData.address}\n`;
    message += `🚚 Kurir Expres: ${formData.courier}\n`;
    message += `💳 Metode Bayar: ${formData.payment}\n`;
    if (formData.notes) message += `📝 Catatan Khusus: ${formData.notes}\n`;

    message += `\n*Rincian Produk Pesanan:*\n`;
    cartItems.forEach((item, idx) => {
      let varInfo = [];
      if (item.selectedScent) varInfo.push(`Aroma: ${item.selectedScent}`);
      if (item.selectedSize) varInfo.push(`Size: ${item.selectedSize}`);
      if (item.selectedColor) varInfo.push(`Warna: ${item.selectedColor}`);
      const varStr = varInfo.length > 0 ? ` (${varInfo.join(', ')})` : '';
      
      message += `${idx + 1}. *${item.name}*${varStr}\n   ${item.quantity}x @ ${formatRupiah(item.price)} = *${formatRupiah(item.price * item.quantity)}*\n`;
    });

    message += `\n*Ringkasan Biaya:*\n`;
    message += `Subtotal Produk: ${formatRupiah(cartSubtotal)}\n`;
    if (totalDiscount > 0) message += `Potongan Diskon: -${formatRupiah(totalDiscount)}\n`;
    message += `Ongkos Kirim: ${formatRupiah(shippingCost)}\n`;
    message += `*TOTAL PEMBAYARAN: ${formatRupiah(cartTotal)}*\n\n`;
    message += `Halo Admin CS AZ Store Care, mohon konfirmasi pesanan saya. Sepatu & kaos kaki saya siap tampil fresh! 🙏`;

    const sellerPhoneNumber = "6281234567890";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${sellerPhoneNumber}?text=${encodedMessage}`, '_blank');
  };

  // Reset Product Selected detail options when modal opens
  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes?.[0] || "");
      setSelectedColor(selectedProduct.colors?.[0] || "");
      setSelectedScent(selectedProduct.scents?.[0] || "");
    }
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 animate-bounce">
          <Sparkles className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* --- HEADER / NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo Brand */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => { setActiveCategory("Semua Produk"); window.scrollTo({top:0, behavior:'smooth'}); }}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 via-teal-800 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                AZ
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-slate-900 via-teal-900 to-teal-600 bg-clip-text text-transparent tracking-tight">
                  AZ Store Care
                </span>
                <span className="text-[10px] block text-teal-700 font-bold uppercase tracking-widest -mt-1">
                  Kick Care & Sports Essentials
                </span>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <input
                type="text"
                placeholder="Cari pembersih sepatu, spray, atau kaos kaki..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-0 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              {searchQuery && (
                <X className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 cursor-pointer hover:text-slate-600" onClick={() => setSearchQuery("")} />
              )}
            </div>

            {/* Wishlist & Shopping Cart */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => showToast(`Favorit Anda (${wishlist.length} barang)`)}
                className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
                title="Produk Favorit"
              >
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-full font-bold shadow-md shadow-teal-200 transition-all transform active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Keranjang</span>
                {totalItemsInCart > 0 && (
                  <span className="bg-slate-900 text-teal-300 text-xs font-black px-2 py-0.5 rounded-full">
                    {totalItemsInCart}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pembersih sepatu atau kaos kaki..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-0 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO BANNER SECTION --- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white pt-10 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/40 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Official Store AZ Store Care
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Rawat Sepatu & <br />
                <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Kaos Kaki Olahraga
                </span> Favoritmu.
              </h1>
              
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Tetap <b>Clean, Fresh, dan Siap Aksi!</b> Solusi lengkap Kick Care Cleaner, Deodorizer Spray anti-bakteri, serta kaos kaki olahraga tebal anti-slip berkualitas tinggi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href="#catalog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-teal-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  Belanja Produk Care <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#guide"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 font-semibold px-6 py-4 rounded-2xl transition-all text-xs sm:text-sm"
                >
                  <BookOpen className="w-4 h-4 text-teal-400" /> Tips Perawatan Sepatu
                </a>
              </div>

              {/* Value Propositions */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-teal-400">99.9%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Bebas Kuman & Bau</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-teal-400">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Aman Semua Bahan</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-teal-400">15rb+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Sepatu Terawat</div>
                </div>
              </div>
            </div>

            {/* Hero Right Feature Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-slate-800/90 p-4 border border-slate-700 shadow-2xl backdrop-blur-md">
                <span className="absolute top-6 left-6 z-10 bg-teal-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  STARTER KIT
                </span>
                <img 
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80" 
                  alt="Kick Care Kit" 
                  className="w-full h-72 object-cover rounded-2xl mb-4"
                />
                <div className="p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-teal-400 uppercase tracking-wider">Shoe Cleaner Kit</span>
                    <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                      <Star className="w-4 h-4 fill-amber-400" /> 4.9 (342 ulasan)
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base">AZ Kick Care Premium Shoe Cleaner (250ml)</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xl font-black text-teal-300">{formatRupiah(129000)}</span>
                    <span className="text-xs text-slate-400 line-through">{formatRupiah(169000)}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(PRODUCTS_DATA[0])}
                    className="w-full mt-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                  >
                    <ShoppingCart className="w-4 h-4" /> Beli Kit Pembersih
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- ADVANTAGES BANNER --- */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Bahan 98% Natural</h4>
                <p className="text-[11px] text-slate-500">Aman untuk Suede & Leather</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Anti-Bakteri & Bau</h4>
                <p className="text-[11px] text-slate-500">Aroma segar tahan 24 jam</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Kaos Kaki Anti-Slip</h4>
                <p className="text-[11px] text-slate-500">Busa empuk ramah olahraga</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Kirim Hari Ini</h4>
                <p className="text-[11px] text-slate-500">Order sebelum jam 15.00 WIB</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CATALOG SECTION --- */}
      <section id="catalog" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" /> Katalog AZ Store Care
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Pembersih Sepatu & Kaos Kaki Olahraga
              </h2>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500 font-medium">Urutkan:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Rekomendasi</option>
                <option value="price-low">Harga: Termurah</option>
                <option value="price-high">Harga: Termahal</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
            {[
              "Semua Produk", 
              "Shoe Cleaner / Kick Care", 
              "Kaos Kaki Olahraga", 
              "Spray & Deodorizer", 
              "Care Bundles & Accessories"
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 text-teal-300 shadow-lg shadow-slate-900/10"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">Produk Tidak Ditemukan</h3>
              <p className="text-slate-400 text-xs mt-1">Coba gunakan kata kunci lain untuk produk perawatan sepatu atau kaos kaki.</p>
              <button 
                onClick={() => { setActiveCategory("Semua Produk"); setSearchQuery(""); }}
                className="mt-4 text-xs font-bold text-teal-600 hover:underline"
              >
                Tampilkan Semua Produk
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isFavorite = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col cursor-pointer relative"
                  >
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      {product.badge && (
                        <span className="bg-slate-900/90 backdrop-blur-md text-teal-300 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                          {product.badge}
                        </span>
                      )}
                      {product.discount && (
                        <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-lg">
                          -{product.discount}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Icon */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-slate-600 shadow-sm transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
                    </button>

                    {/* Image Preview */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-teal-600" /> Detail Produk
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-medium text-teal-700">{product.category}</span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{product.rating}</span>
                          </div>
                        </div>

                        <h3 className="font-bold text-slate-800 line-clamp-2 text-sm leading-snug group-hover:text-teal-700 transition-colors">
                          {product.name}
                        </h3>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-black text-slate-900">
                            {formatRupiah(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatRupiah(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart CTA */}
                        <button
                          onClick={(e) => addToCart(product, null, null, null, e)}
                          className="w-full mt-3 bg-slate-900 hover:bg-teal-600 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> + Keranjang
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* --- GUIDE / CARE TIPS SECTION --- */}
      <section id="guide" className="bg-teal-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30 uppercase tracking-widest">
              Panduan Pemula
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Cara Merawat Sepatu & Kaos Kaki Olahraga Agar Awet & Bebas Bau
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Tips praktis dari tim profesional AZ Store Care untuk menjaga kualitas sneakers dan peralatan olahraga Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="font-bold text-base text-white">Gunakan Sikat Sesuai Bahan</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Gunakan sikat bertali standar untuk outsole/midsoles, dan sikat bulu kuda (Horsehair Brush) yang lembut khusus untuk bahan Suede, Leather, atau Primeknit agar serat kain tidak merudul.
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="font-bold text-base text-white">Jangan Jemur di Bawah Terik Matahari</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Setelah dicuci dengan AZ Kick Care, usap dengan lap Mikrofiber lalu angin-anginkan di tempat teduh. Sinar matahari langsung dapat membuat lem sepatu memuai dan sol menjadi menguning (*yellowing*).
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="font-bold text-base text-white">Semprot Deodorizer Rutin</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Gunakan AZ Deodorizer Spray pada insole sepatu dan kaos kaki olahraga sebelum dan sesudah latihan. Kandungan anti-bakterinya mencegah jamur berkembang biak penyebab bau tidak sedap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Ulasan Atlet & Sneakerhead</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">Pengalaman langsung pengguna AZ Store Care yang sudah membuktikannya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dimas Anggara",
                role: "Marathon Runner",
                comment: "AZ Kick Care super ampuh ngilangin noda lumpur di sepatu lari gua habis event trail run. Dikeringin sebentar langsung kenceng dan adem lagi!",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
              },
              {
                name: "Kevin Sanjaya",
                role: "Pemain Futsal & Sneakerhead",
                comment: "Kaos kaki Cushion Crew-nya gokil empuknya! Pas dipake main futsal ga bikin kaki lecet sama sekali. Ditambah spray deodorizer-nya bikin sepatu ga bau apek.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
              },
              {
                name: "Clara Amalia",
                role: "Gym & Fitness Enthusiast",
                comment: "Water repellent spray-nya beneran ajaib! Sepatu putih gym saya disiram air kopi langsung meluncur airnya ga nempel sama sekali.",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              }
            ].map((testi, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/70 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">"{testi.comment}"</p>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200">
                  <img src={testi.avatar} alt={testi.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{testi.name}</h4>
                    <span className="text-[11px] text-teal-700 font-semibold">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-black text-sm">AZ</div>
                <span className="text-base font-black text-white">AZ Store Care</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Spesialis perawatan sepatu (Kick Care) & kaos kaki olahraga premium. Solusi praktis agar sepatu dan kaos kaki Anda senantiasa bersih, wangi, dan tahan lama.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Kategori Produk</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveCategory("Shoe Cleaner / Kick Care")} className="hover:text-teal-400 transition-colors">Kick Care Pembersih Sepatu</button></li>
                <li><button onClick={() => setActiveCategory("Kaos Kaki Olahraga")} className="hover:text-teal-400 transition-colors">Kaos Kaki Olahraga Anti-Slip</button></li>
                <li><button onClick={() => setActiveCategory("Spray & Deodorizer")} className="hover:text-teal-400 transition-colors">Deodorizer & Repellent Spray</button></li>
                <li><button onClick={() => setActiveCategory("Care Bundles & Accessories")} className="hover:text-teal-400 transition-colors">Sikat & Paket Hemat Care</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Layanan CS AZ Care</h4>
              <p className="mb-2">WhatsApp CS: +62 812-3456-7890</p>
              <p className="mb-2">Jam Operasional: 08.00 - 21.00 WIB</p>
              <p className="text-slate-500">Pengiriman dari: Jakarta & Surabaya</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Jaminan Pelanggan</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-400" /> Garansi Produk 100% Original</li>
                <li className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-teal-400" /> Pengiriman Bulewrap Tebal Aman</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-teal-400" /> Konsultasi Gratis Pembersihan Sepatu</li>
              </ul>
            </div>

          </div>

          <div className="pt-8 text-center text-slate-500">
            © {new Date().getFullYear()} AZ Store Care - Kick Care & Sports Apparel Care Essentials.
          </div>
        </div>
      </footer>

      {/* --- MODAL DETAIL PRODUK --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 p-6 sm:p-8 gap-8">
              {/* Product Modal Image */}
              <div>
                <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Product Modal Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">{selectedProduct.category}</span>
                  <h2 className="text-xl font-black text-slate-900 mt-1 mb-2 leading-snug">{selectedProduct.name}</h2>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800">{selectedProduct.rating}</span>
                    <span className="text-xs text-slate-400">({selectedProduct.reviewsCount} ulasan)</span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-black text-slate-900">{formatRupiah(selectedProduct.price)}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">{formatRupiah(selectedProduct.originalPrice)}</span>
                    )}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Scent Variant Selector */}
                  {selectedProduct.scents && selectedProduct.scents.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Pilih Varian Aroma:</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.scents.map((sct) => (
                          <button
                            key={sct}
                            onClick={() => setSelectedScent(sct)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              selectedScent === sct
                                ? "bg-teal-700 text-white shadow-sm"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {sct}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selector */}
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Pilih Ukuran Kaos Kaki:</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              selectedSize === sz
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Selector */}
                  {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Pilih Varian Warna:</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((clr) => (
                          <button
                            key={clr}
                            onClick={() => setSelectedColor(clr)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              selectedColor === clr
                                ? "bg-teal-700 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {clr}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Keunggulan Produk:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {selectedProduct.features?.map((ft, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{ft}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct, selectedSize, selectedColor, selectedScent);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-3.5 rounded-2xl shadow-lg shadow-teal-200 transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <ShoppingCart className="w-4 h-4" /> Masukkan ke Keranjang Belanja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SHOPPING CART DRAWER --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-base">Keranjang AZ Store Care</h3>
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium text-xs">Keranjang belanja Anda masih kosong.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-xs font-bold text-teal-600 hover:underline"
                  >
                    Pilih Pembersih Sepatu & Kaos Kaki
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartKey} className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-xs truncate">{item.name}</h4>
                      
                      <div className="text-[10px] text-slate-500 mt-0.5 space-x-1">
                        {item.selectedScent && <span>Aroma: {item.selectedScent}</span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>Warna: {item.selectedColor}</span>}
                      </div>

                      <div className="font-black text-slate-900 text-xs mt-1">
                        {formatRupiah(item.price)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-full gap-2">
                      <button 
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200">
                        <button 
                          onClick={() => updateQuantity(item.cartKey, -1)}
                          className="text-slate-500 hover:text-slate-800 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-extrabold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartKey, 1)}
                          className="text-slate-500 hover:text-slate-800 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Voucher & Cart Total Footer */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
                
                {/* Coupon Voucher Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Kode kupon: AZCLEAN20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none uppercase"
                    />
                    <button type="submit" className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-slate-800">
                      Gunakan
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-rose-500 font-medium">{couponError}</p>}
                </form>

                {/* Subtotal Calculations */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal Produk</span>
                    <span className="font-semibold text-slate-800">{formatRupiah(cartSubtotal)}</span>
                  </div>
                  
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-teal-700 font-semibold">
                      <span>Total Diskon Kupon/Promo</span>
                      <span>-{formatRupiah(totalDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500">
                    <span>Estimasi Ongkir</span>
                    <span className="font-semibold text-slate-800">{formatRupiah(shippingCost)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Pembayaran</span>
                    <span className="text-teal-700">{formatRupiah(cartTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  Lanjut ke Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- CHECKOUT MODAL FORM --- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-slate-900 mb-1">Checkout & Pengiriman AZ Store Care</h2>
            <p className="text-xs text-slate-500 mb-6">Lengkapi data Anda agar pesanan sepatu & kaos kaki bisa langsung diproses.</p>

            <form onSubmit={handleWhatsAppCheckout} className="space-y-6">
              
              {/* Form Input Data */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-teal-700 uppercase tracking-wider">1. Data Penerima</h4>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dimas Prasetyo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Pengiriman Lengkap *</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Jalan, No. Rumah, RT/RW, Kecamatan, Kota & Kode Pos"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Courier Selection */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-teal-700 uppercase tracking-wider">2. Pilih Kurir Pengiriman</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(courierOptions).map(([courier, cost]) => (
                    <label 
                      key={courier} 
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        formData.courier === courier 
                          ? "border-teal-600 bg-teal-50/60 font-bold text-teal-900" 
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="courier"
                          checked={formData.courier === courier}
                          onChange={() => setFormData({...formData, courier})}
                          className="text-teal-600"
                        />
                        <span>{courier}</span>
                      </div>
                      <span className="font-extrabold text-slate-900">{formatRupiah(cost)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-teal-700 uppercase tracking-wider">3. Metode Pembayaran</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "QRIS / E-Wallet", icon: Smartphone },
                    { id: "Transfer Bank BCA/Mandiri", icon: CreditCard },
                    { id: "COD (Bayar Di Tempat)", icon: Wallet }
                  ].map((pay) => {
                    const IconComp = pay.icon;
                    return (
                      <label 
                        key={pay.id} 
                        className={`flex items-center gap-2 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          formData.payment === pay.id 
                            ? "border-teal-600 bg-teal-50/60 font-bold text-teal-900" 
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.payment === pay.id}
                          onChange={() => setFormData({...formData, payment: pay.id})}
                          className="text-teal-600"
                        />
                        <IconComp className="w-4 h-4 text-teal-600" />
                        <span>{pay.id}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Order Total Overview */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Produk ({totalItemsInCart} item)</span>
                  <span>{formatRupiah(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ongkos Kirim ({formData.courier.split('-')[0]})</span>
                  <span>{formatRupiah(shippingCost)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-teal-400">
                    <span>Total Diskon</span>
                    <span>-{formatRupiah(totalDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-800 text-teal-300">
                  <span>TOTAL PEMBAYARAN</span>
                  <span>{formatRupiah(cartTotal)}</span>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              >
                <MessageSquare className="w-5 h-5" /> Pesan Sekarang via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}