using Guild.Models;
using Microsoft.EntityFrameworkCore;

namespace Guild.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<Member> Member { get; set; }
        public DbSet<Quest> Quest { get; set; }
        public DbSet<MemberQuest> MemberQuest { get; set; }
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { 
        
        }

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.LogTo(Console.WriteLine);*/

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MemberQuest>().HasKey(mq => new { mq.MemberId, mq.QuestId });

            modelBuilder.Entity<MemberQuest>()
                .HasOne(m => m.Quest)
                .WithMany(q => q.MemberQuests)
                .HasForeignKey(mq => mq.QuestId);

            modelBuilder.Entity<MemberQuest>()
                .HasOne(m => m.Member)
                .WithMany(q => q.MemberQuests)
                .HasForeignKey(mq => mq.MemberId);
        }
    }
}