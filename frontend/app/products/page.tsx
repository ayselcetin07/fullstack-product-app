import { fetchProducts } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
};

export default async function ProductsPage() {
  const products: Product[] = await fetchProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <ul className="space-y-2">
        {products.map((p: Product) => (
          <li key={p.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>{p.description}</p>
            <span className="text-sm text-gray-500">{p.price} ₺</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
