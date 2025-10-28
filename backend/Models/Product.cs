namespace backend.Models
{
    public class Product
    {
        public int Id { get; set; }                     // Otomatik artan birincil anahtar
        public string Name { get; set; } = string.Empty; // Ürün adı
        public decimal Price { get; set; }               // Ürün fiyatı
        public string? Description { get; set; }
    }
}
