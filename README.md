#  E-Ticaret Ürün Yönetim Paneli

Bu proje, ürün ekleme ve listeleme işlemlerini yapan basit bir e-ticaret yönetim panelidir.  
Ön yüz (frontend) Next.js ile, arka yüz (backend) .NET Core ile geliştirilmiştir.

---

##  Klasörler

- `frontend` → Kullanıcı arayüzü (Next.js + TailwindCSS)  
- `backend` → API ve veritabanı işlemleri (.NET Core + SQL Server)

---

##  Gerekli Programlar

- Node.js (18 ve üzeri)  
- .NET SDK (7 ve üzeri)  
- SQL Server  
- Git

---

##  Frontend Kurulumu

1. `frontend` klasörüne gir:

```
cd frontend


2. Gerekli paketleri yükle:


npm install

3. Ortam dosyası oluştur:

.env dosyası içine şunu yaz:

NEXT_PUBLIC_API_URL=http://localhost:5074




4. Uygulamayı çalıştır:


npm run dev
Tarayıcıdan http://localhost:3000/products adresine gir.



## Backend Kurulumu

1. backend klasörüne gir:
cd backend
Veritabanı bağlantısını ayarla: appsettings.json dosyasındaki "DefaultConnection" kısmını kendi bilgisayarına göre düzenle:

json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ECommerceDb;Trusted_Connection=True;"
}

2. Veritabanını oluştur:


dotnet ef migrations add InitialCreate
dotnet ef database update

3.API’yi başlat:


dotnet run
