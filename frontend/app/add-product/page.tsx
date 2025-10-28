'use client'
import { useState } from 'react'

export default function AddProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) })
    })
    setName('')
    setPrice('')
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Ürün Ekle</h1>
      <input
        type="text"
        placeholder="Ürün adı"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Fiyat"
        value={price}
        onChange={e => setPrice(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Kaydet
      </button>
    </form>
  )
}
