export async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (!res.ok) throw new Error("Ürünler alınamadı");
  return res.json();
}

export async function addProduct(data: {
  name: string;
  description?: string;
  price: number;
  category: string;
  quantity: number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Ürün eklenemedi");
  return res.json();
}
