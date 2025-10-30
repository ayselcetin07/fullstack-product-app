"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  quantity: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch {
        toast.error("Ürünler yüklenemedi");
      }
    };
    load();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-lora text-red-600 dark:text-white">
          ÜRÜN LİSTESİ
        </h1>
        <Link href="/add-product">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Yeni Ürün Ekle
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">Henüz ürün eklenmedi.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <li
              key={p.id}
              className="border p-4 rounded shadow-sm hover:shadow-md transition font-raleway"
            >
              <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
              {p.description && (
                <p className="text-sm text-gray-700 mb-2">{p.description}</p>
              )}
              <p className="text-sm text-black">Kategori: {p.category}</p>
              <p className="text-sm text-black">Adet: {p.quantity}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-red-600">
                  Birim: {new Intl.NumberFormat("tr-TR").format(p.price)} ₺
                </span>
                <span className="text-sm font-semibold text-green-600">
                  Toplam:{" "}
                  {new Intl.NumberFormat("tr-TR").format(
                    p.price * p.quantity
                  )}{" "}
                  ₺
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
