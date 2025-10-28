
using backend.Data;
using backend.Repositories;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔌 Veritabanı bağlantısı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🧩 Dependency Injection
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<ProductService>();

// 🌐 CORS tanımı → frontend erişimi için şart
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Next.js frontend adresi
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 🌐 API ve Swagger servisleri
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🧪 Swagger middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🌍 HTTP pipeline
app.UseHttpsRedirection();
app.UseCors("AllowFrontend"); // ✅ CORS middleware aktif edildi
app.UseAuthorization();
app.MapControllers();

app.Run();
