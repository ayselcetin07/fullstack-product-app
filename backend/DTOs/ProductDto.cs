namespace backend.Dtos
{
    public class ProductDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }

        // Opsiyonel açıklama alanı
        public string? Description { get; set; }
    }
}
