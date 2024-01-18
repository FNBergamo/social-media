using Domain.Entitties;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
 public class SocialMediaContext : DbContext
    {
        public SocialMediaContext(DbContextOptions<SocialMediaContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

             base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Post>()
                .HasKey(p => p.Id);
            
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)  
                .WithMany()           
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Comment>()
                .HasKey(c => c.Id);
            
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)  
                .WithMany()           
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)  
                .WithMany()           
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Friendship>()
                .HasKey(f => new { f.SenderUserId, f.RequestedUserId });

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.SenderUser)
                .WithMany()
                .HasForeignKey(f => f.SenderUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.RequestedUser)
                .WithMany()
                .HasForeignKey(f => f.RequestedUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PostInteraction>()
                .HasKey(pi => new { pi.UserId, pi.PostId });

            modelBuilder.Entity<PostInteraction>()
                .HasOne(pi => pi.User)
                .WithMany()
                .HasForeignKey(pi => pi.UserId);

            modelBuilder.Entity<PostInteraction>()
                .HasOne(pi => pi.Post)
                .WithMany()
                .HasForeignKey(pi => pi.PostId);
            
            modelBuilder.Entity<CommentInteraction>()
                .HasKey(ci => new { ci.UserId, ci.CommentId });

            modelBuilder.Entity<CommentInteraction>()
                .HasOne(ci => ci.User)
                .WithMany()
                .HasForeignKey(ci => ci.UserId);

            modelBuilder.Entity<CommentInteraction>()
                .HasOne(ci => ci.Comment)
                .WithMany()
                .HasForeignKey(ci => ci.CommentId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users{ get; set; }
        public DbSet<Post> Posts{ get; set; }
        public DbSet<Comment> Comments{ get; set; }
        public DbSet<Friendship> Friendships{ get; set; }
        public DbSet<PostInteraction> PostInteractions{ get; set; }
        public DbSet<CommentInteraction> CommentInteractions{ get; set; }
    }
}