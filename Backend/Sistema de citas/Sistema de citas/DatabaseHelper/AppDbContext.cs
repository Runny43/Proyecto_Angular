using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Sistema_de_citas.Model;

namespace Sistema_de_citas.DatabaseHelper
{
    public class AppDbContext : DbContext

    {

        public AppDbContext(DbContextOptions<AppDbContext> options)

            : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Servicios> Servicios { get; set; }
        public DbSet<Quotes> Quotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }


    }


}
