
"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



import { useState } from "react";
import { addProduct } from "@/lib/api";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState("");



const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  try {
    await addProduct({ name, description, price });
    toast.success("Ürün başarıyla eklendi"); // ✅ Toast burada
    router.push("/products");                // ✅ Ardından yönlendirme
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    setError(message || "Ürün eklenemedi");
    toast.error(message || "Ürün eklenemedi");          // ✅ Hata durumunda da toast
  }
};

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ürün adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Ekle
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
