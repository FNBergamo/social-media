using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using Domain.Primitives;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly SocialMediaContext _context;

        public PostRepository(SocialMediaContext context)
        {
            _context = context;
        }

        public async Task<Post?> GetById(Guid id)
        {
            return await _context.Posts.FindAsync(id);
        }

        public async Task Save(Post post)
        {
            _context.Add(post);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Post post)
        {
            _context.Update(post);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Post post)
        {
            _context.Remove(post);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Post>> List(Guid userId, IPageable pageable)
        {
            var userFriendships = await _context.Friendships
                .Where(f => f.Status == FriendshipStatus.Accepted &&
                            (f.SenderUserId == userId || f.RequestedUserId == userId))
                .Select(f => f.SenderUserId == userId ? f.RequestedUserId : f.SenderUserId)
                .ToListAsync();

            var posts = await _context.Posts
                .Include(p => p.User)
                .Where(p =>
                    (!p.IsPrivate && !p.IsHidden) || // Posts públicos ou não ocultos
                    (p.IsPrivate && p.UserId == userId) || // Posts privados do próprio usuário
                    (p.IsPrivate && userFriendships.Contains(p.UserId))) // Posts privados de amigos
                .OrderByDescending(p => p.CreteadAtUtc)
                .Skip((pageable.Page - 1) * pageable.Size)
                .Take(pageable.Size)
                .ToListAsync();

            foreach (var post in posts)
            {
                var interaction = await _context.PostInteractions
                    .FirstOrDefaultAsync(pi => pi.UserId == userId && pi.PostId == post.Id);

                if (interaction != null)
                {
                    post.UserInteraction = interaction.Type;
                }
                else
                {
                    post.UserInteraction = null;
                }
            }

            return posts;
        }
    }
}