using backend.Dtos;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ProductService
    {
        private readonly ProductRepository _repository;

        public ProductService(ProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Product> CreateAsync(ProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                Description = dto.Description
            };

            return await _repository.CreateAsync(product);
        }
    }
}
