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
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Quotes>()
        .HasOne(q => q.Users)
        .WithMany(u => u.Quotes)
        .HasForeignKey(q => q.UsersId);

            modelBuilder.Entity<Quotes>()
                .HasOne(q => q.Servicios)
                .WithMany(s => s.Quotes)
                .HasForeignKey(q => q.ServiciosId);
        }


    }


}
