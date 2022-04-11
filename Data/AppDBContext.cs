using Guild.Models;
using Microsoft.EntityFrameworkCore;

namespace Guild.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { 
        
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Quest> Quests { get; set; }
        
    }
}
