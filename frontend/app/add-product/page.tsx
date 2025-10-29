"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { addProduct } from "@/lib/api";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState<number>(1); // Başlangıç değeri 1
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (quantity < 1 || price < 0) {
      setError("Adet en az 1 olmalı, fiyat negatif olamaz");
      toast.error("Adet en az 1 olmalı, fiyat negatif olamaz");
      return;
    }

    try {
      await addProduct({ name, description, price, category, quantity });
      toast.success("Ürün başarıyla eklendi");
      router.push("/products");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Ürün eklenemedi");
      toast.error(message || "Ürün eklenemedi");
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Ürün Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Açıklama</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
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

        <div>
          <label className="block font-medium mb-1">Adet (minimum 1)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border p-2 rounded"
            min={1}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fiyat (₺)</label>
          <input
            type="text"
            value={price.toString()}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ekle
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </main>
  );
}
