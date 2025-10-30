"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { addProduct } from "@/lib/api";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPriceError("");
    setQuantityError("");

    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);

    let hasError = false;

    if (isNaN(numericPrice) || numericPrice < 1) {
      setPriceError("Lütfen geçerli bir fiyat giriniz (₺1 ve üzeri).");
      hasError = true;
    }

    if (isNaN(numericQuantity) || numericQuantity < 1) {
      setQuantityError("Lütfen geçerli bir adet giriniz (en az 1 olmalıdır)");
      hasError = true;
    }

    if (hasError) {
      toast.error("Lütfen geçerli fiyat ve adet giriniz");
      return;
    }

    try {
      await addProduct({
        name,
        description,
        price: numericPrice,
        category,
        quantity: numericQuantity,
      });
      toast.success("Ürün başarıyla eklendi");
      router.push("/products");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Ürün eklenemedi");
      toast.error(message || "Ürün eklenemedi");
    }
  };

  return (
    <main className="py-10 px-6 w-full max-w-2xl mx-auto font-raleway">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold font-lora text-blue-700">
          Yeni Ürün Ekle
        </h1>
        <Link href="/products">
          <button className="text-[17px] font-semibold font-lora text-red-500 border border-white px-4 py-2 rounded hover:bg-red-500 hover:text-white hover:border-white transition">
            Ürün Listesine Dön
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Ürün Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Kategori seçin</option>
            <option value="Gıda">Gıda</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Kırtasiye">Kırtasiye</option>
            <option value="Ev Eşyası">Ev Eşyası</option>
            <option value="Kozmetik">Kozmetik</option>
            <option value="Kitap">Kitap</option>
            <option value="Oyuncak">Oyuncak</option>
            <option value="Giyim">Giyim</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Adet</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              inputMode="numeric"
              required
            />
            {quantityError && (
              <p className="text-sm text-red-600 mt-1">{quantityError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fiyat (₺)</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {priceError && (
              <p className="text-sm text-red-600 mt-1">{priceError}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Ürünü Kaydet
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </main>
  );
}
