import React, { useRef, useState } from "react";
import "./components/customerServices.css"

const aiResponses = {
  tiket: [
    "🎫 Untuk pembelian tiket TransJakarta/MRT:\n\n📍 Pilih rute perjalanan Anda\n💰 Cek tarif (mulai Rp3.500)\n📱 Pilih metode pembayaran\n✅ Konfirmasi pembelian\n\n❓ Di bagian mana Anda mengalami kendala?",
    "🚌 Saya bantu dengan tiket transportasi Anda!\n\nApakah masalahnya:\n• Tidak bisa pilih stasiun/halte?\n• Error saat checkout?\n• Tiket tidak muncul setelah bayar?\n\nJelaskan lebih detail ya!",
  ],
  rute: [
    "🗺️ Untuk pencarian rute:\n\n1. Masukkan stasiun/halte asal\n2. Pilih tujuan Anda\n3. Sistem akan tampilkan:\n   • Jalur yang dilalui\n   • Waktu tempuh\n   • Tarif perjalanan\n   • Transit (jika ada)\n\n📍 Rute mana yang ingin Anda cari?",
    "🚇 Fitur pencari rute kami mencakup:\n• TransJakarta (semua koridor)\n• MRT Jakarta\n• LRT Jakarta\n• KRL Commuter Line\n\nDari mana ke mana perjalanan Anda?",
  ],
  pembayaran: [
    "💳 Metode pembayaran yang tersedia:\n\n📱 E-wallet:\n• JakCard\n• OVO, GoPay, Dana\n• ShopeePay, LinkAja\n\n🏦 Bank:\n• Transfer Bank\n• Virtual Account\n• Kartu Kredit/Debit\n\n🎫 Kartu Fisik:\n• Tap in langsung di stasiun\n\nMau pakai metode yang mana?",
    "💰 Kalau pembayaran gagal, coba:\n\n1. Cek saldo e-wallet/rekening\n2. Pastikan koneksi internet stabil\n3. Gunakan metode pembayaran lain\n4. Restart aplikasi\n\nTiket akan otomatis masuk ke \"Tiket Saya\" setelah pembayaran berhasil!",
  ],
  tarif: [
    "💰 Info tarif transportasi Jakarta:\n\n🚌 TransJakarta: Rp3.500\n🚇 MRT: Rp3.000 - Rp14.000\n🚆 LRT: Rp5.000 - Rp12.000\n🚄 KRL: Rp3.000 - Rp7.000\n\n✨ Pakai JakCard dapat diskon!\n🎫 Beli paket harian/bulanan lebih hemat!",
    "🎟️ Untuk menghemat biaya transport:\n\n• Beli tiket terusan multi-moda\n• Gunakan JakCard (cashless)\n• Ambil paket berlangganan\n• Cek promo di menu \"Penawaran\"\n\nMau info paket berlangganan?",
  ],
  jadwal: [
    "⏰ Jadwal operasional:\n\n🚌 TransJakarta:\n• Senin-Jumat: 05:00 - 22:00\n• Sabtu-Minggu: 06:00 - 22:00\n\n🚇 MRT Jakarta:\n• Setiap hari: 05:00 - 24:00\n\n🚆 LRT Jakarta:\n• Setiap hari: 05:30 - 22:00\n\nℹ️ Jadwal bisa berubah saat libur nasional!",
    "🕐 Untuk cek jadwal real-time:\n\n1. Buka menu \"Jadwal Live\"\n2. Pilih stasiun/halte\n3. Lihat estimasi kedatangan\n\n⚡ Fitur notifikasi akan kasih tau kalau ada gangguan atau perubahan jadwal!",
  ],
  gangguan: [
    "⚠️ Info gangguan operasional:\n\n🔄 Cek status real-time di menu \"Info Gangguan\"\n📢 Follow sosial media @TransJakarta @mrtjkt\n📱 Aktifkan push notifikasi untuk update\n\n🚌 Jika ada gangguan, sistem akan sarankan rute alternatif otomatis!",
    "🚨 Kalau ada masalah di perjalanan:\n\n• Hubungi petugas stasiun\n• Gunakan tombol \"Laporkan Masalah\"\n• Cek pengumuman di aplikasi\n• Gunakan rute alternatif yang disarankan\n\nAda gangguan apa yang Anda alami?",
  ],
  jakcard: [
    "🎫 JakCard - Kartu transportasi Jakarta:\n\n✅ Manfaat:\n• Tarif lebih murah\n• Tap sekali untuk semua moda\n• Tidak perlu beli tiket berulang\n• Bisa top up di aplikasi\n\n📍 Beli di:\n• Vending Machine stasiun\n• Loket petugas\n• Minimarket (Indomaret, Alfamart)\n\n💳 Mau registrasi JakCard?",
    "💡 Tips pakai JakCard:\n\n• Top up sebelum saldo habis\n• Tap in & tap out di setiap stasiun\n• Satu kartu bisa untuk semua angkutan\n• Cek saldo di aplikasi atau vending\n\n❓ Ada masalah dengan JakCard Anda?",
  ],
  topup: [
    "💰 Cara top up saldo:\n\n📱 Di aplikasi:\n• Menu \"Top Up\"\n• Pilih nominal\n• Bayar pakai e-wallet/bank\n\n🏪 Offline:\n• Vending machine stasiun\n• Loket petugas\n• Minimarket terdekat\n\n⚡ Top up via aplikasi langsung masuk ke kartu/akun!",
    "🔄 Kalau top up gagal:\n\n1. Cek koneksi internet\n2. Pastikan saldo e-wallet cukup\n3. Coba metode pembayaran lain\n4. Restart aplikasi\n\nSaldo akan otomatis bertambah dalam 1-2 menit!",
  ],
  default: [
    "🚌 Halo! Saya asisten digital untuk aplikasi tiket transportasi Jakarta. Saya bisa bantu dengan:\n\n🎫 Pembelian tiket\n🗺️ Pencarian rute\n💳 Pembayaran & top up\n⏰ Jadwal & info gangguan\n🎟️ JakCard\n\nAda yang bisa saya bantu?",
    "👋 Selamat datang di layanan bantuan TransJakarta & MRT! Mau tanya tentang apa?\n\n• Cara beli tiket\n• Info rute & tarif\n• Masalah pembayaran\n• Jadwal keberangkatan\n• JakCard & top up",
    "🚇 Saya siap membantu perjalanan Anda di Jakarta! Silakan pilih topik atau langsung tanyakan masalah yang Anda hadapi.",
    "📱 Ada kendala dengan aplikasi transportasi? Saya akan bantu selesaikan step by step!",
  ],
};

function getLocalAIResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  if (
    lowerMessage.includes("gangguan") ||
    lowerMessage.includes("terlambat") ||
    lowerMessage.includes("delay") ||
    lowerMessage.includes("rusak") ||
    lowerMessage.includes("mati") ||
    lowerMessage.includes("bermasalah") ||
    (lowerMessage.includes("kenapa") &&
      (lowerMessage.includes("mrt") ||
        lowerMessage.includes("transjakarta") ||
        lowerMessage.includes("lrt")))
  ) {
    return aiResponses.gangguan[Math.floor(Math.random() * aiResponses.gangguan.length)];
  } else if (
    lowerMessage.includes("jakcard") ||
    lowerMessage.includes("jak card") ||
    (lowerMessage.includes("kartu") && !lowerMessage.includes("kredit"))
  ) {
    return aiResponses.jakcard[Math.floor(Math.random() * aiResponses.jakcard.length)];
  } else if (
    lowerMessage.includes("top up") ||
    lowerMessage.includes("topup") ||
    lowerMessage.includes("isi ulang") ||
    lowerMessage.includes("saldo") ||
    lowerMessage.includes("isi saldo")
  ) {
    return aiResponses.topup[Math.floor(Math.random() * aiResponses.topup.length)];
  } else if (
    lowerMessage.includes("rute") ||
    lowerMessage.includes("jalan") ||
    lowerMessage.includes("arah") ||
    (lowerMessage.includes("dari") && lowerMessage.includes("ke")) ||
    lowerMessage.includes("bagaimana cara")
  ) {
    return aiResponses.rute[Math.floor(Math.random() * aiResponses.rute.length)];
  } else if (
    lowerMessage.includes("tiket") ||
    lowerMessage.includes("beli") ||
    lowerMessage.includes("purchase") ||
    lowerMessage.includes("checkout") ||
    lowerMessage.includes("tidak bisa beli")
  ) {
    return aiResponses.tiket[Math.floor(Math.random() * aiResponses.tiket.length)];
  } else if (
    lowerMessage.includes("tarif") ||
    lowerMessage.includes("harga") ||
    lowerMessage.includes("biaya") ||
    lowerMessage.includes("ongkos") ||
    lowerMessage.includes("berapa")
  ) {
    return aiResponses.tarif[Math.floor(Math.random() * aiResponses.tarif.length)];
  } else if (
    lowerMessage.includes("jadwal") ||
    lowerMessage.includes("jam") ||
    lowerMessage.includes("waktu") ||
    lowerMessage.includes("operasional") ||
    lowerMessage.includes("buka") ||
    lowerMessage.includes("tutup")
  ) {
    return aiResponses.jadwal[Math.floor(Math.random() * aiResponses.jadwal.length)];
  } else if (
    lowerMessage.includes("bayar") ||
    lowerMessage.includes("payment") ||
    lowerMessage.includes("pembayaran") ||
    lowerMessage.includes("metode") ||
    lowerMessage.includes("gagal bayar")
  ) {
    return aiResponses.pembayaran[Math.floor(Math.random() * aiResponses.pembayaran.length)];
  } else {
    return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
  }
}

export default function CustomerService() {
  const [messages, setMessages] = useState([
    {
      text:
        "🚌 Halo! Saya AI Assistant khusus transportasi Jakarta. Siap membantu dengan tiket TransJakarta, MRT, LRT, dan KRL! \n\nAda yang bisa saya bantu hari ini? 🎫",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const chatRef = useRef(null);

  // Scroll to bottom on new message
  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function sendMessage(msg) {
    const message = (msg ?? input).trim();
    if (!message) return;
    setMessages((m) => [...m, { text: message, sender: "user" }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const aiReply = getLocalAIResponse(message);
      setMessages((m) => [...m, { text: aiReply, sender: "bot" }]);
      setTyping(false);
    }, 900 + Math.random() * 800);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") sendMessage();
  }

  function quickMessage(msg) {
    setInput(msg);
    setTimeout(() => sendMessage(msg), 100);
  }

  function submitFeedback(val) {
    setFeedback(val);
    setMessages((m) => [
      ...m,
      {
        text:
          val === "yes"
            ? "✅ Terima kasih atas feedback positif Anda! Kami senang bisa membantu."
            : "📝 Terima kasih atas feedback Anda. Kami akan terus meningkatkan layanan untuk pengalaman yang lebih baik.",
        sender: "bot",
      },
    ]);
  }

  return (
    <>
      <div className="cs-bg">
        <div className="csContainer">
          <div className="csHeader">
            <h1>CUSTOMER SERVICE</h1>
            <p>🤖 Powered by AI - Halo! Ada yang bisa kami bantu hari ini?</p>
          </div>
          <div className="content">
            <div className="quick-actions">
              <div
                className="action-card"
                onClick={() =>
                  quickMessage("Saya tidak bisa membeli tiket TransJakarta")
                }
              >
                <h3>🎫 Beli Tiket</h3>
                <p>Bantuan pembelian tiket TransJakarta/MRT</p>
              </div>
              <div
                className="action-card"
                onClick={() =>
                  quickMessage(
                    "Bagaimana cara cari rute dari Blok M ke Bundaran HI?"
                  )
                }
              >
                <h3>🗺️ Cari Rute</h3>
                <p>Pencarian rute & jadwal perjalanan</p>
              </div>
              <div
                className="action-card"
                onClick={() =>
                  quickMessage("Saya mau top up JakCard tapi gagal terus")
                }
              >
                <h3>💳 Top Up & Bayar</h3>
                <p>JakCard, e-wallet, dan pembayaran</p>
              </div>
              <div
                className="action-card"
                onClick={() =>
                  quickMessage("Kenapa MRT terlambat? Ada gangguan ya?")
                }
              >
                <h3>⚠️ Info Gangguan</h3>
                <p>Status operasional & gangguan layanan</p>
              </div>
              <div
                className="action-card"
                onClick={() =>
                  quickMessage("Saya ingin bicara dengan customer service langsung")
                }
              >
                <h3>Live Customer Service</h3>
                <p>Layanan tanya jawab langsung dengan CS</p>
              </div>
            </div>
            <div className="chat-container">
              <div className="chat-header">
                <div className="status-indicator"></div>
                🤖 AI Assistant (Real-time) - Online
              </div>
              <div className="chat-messages" ref={chatRef}>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message ${msg.sender}`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\n/g, "<br>"),
                    }}
                  />
                ))}
                {typing && (
                  <div className="typing-indicator">
                    <span>AI sedang mengetik</span>
                    <div className="typing-dots">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="chat-input-container">
                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Ketik pesan Anda di sini..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={typing}
                  />
                  <button
                    className="send-btn"
                    onClick={() => sendMessage()}
                    disabled={typing || !input.trim()}
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
            <div
              className={
                "satisfaction" + (feedback ? " disabled" : "")
              }
              style={feedback ? { opacity: 0.5, pointerEvents: "none" } : {}}
            >
              <h3>Apakah Anda puas dengan layanan kami?</h3>
              <div className="satisfaction-buttons">
                <button
                  className="satisfaction-btn yes"
                  onClick={() => submitFeedback("yes")}
                  disabled={!!feedback}
                >
                  👍 YA
                </button>
                <button
                  className="satisfaction-btn no"
                  onClick={() => submitFeedback("no")}
                  disabled={!!feedback}
                >
                  👎 TIDAK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}