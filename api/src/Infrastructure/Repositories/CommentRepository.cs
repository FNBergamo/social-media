using Domain.Entitties;
using Domain.Interfaces;
using Domain.Primitives;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly SocialMediaContext _context;

        public CommentRepository(SocialMediaContext context)
        {
            _context = context;
        }
        public async Task Delete(Comment comment)
        {
            _context.Remove(comment);
            await _context.SaveChangesAsync();
        }

        public async Task<Comment?> GetById(Guid id)
        {
            return await _context.Comments.FindAsync(id);
        }

        public async Task<IEnumerable<Comment>> List()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<IEnumerable<Comment>> ListByPost(Guid postId, Guid userId, IPageable pageable)
        {
            var comments = await _context.Comments
                .Include(c=> c.User)
                .Where(c => c.PostId == postId)
                .Skip((pageable.Page - 1) * pageable.Size)
                .Take(pageable.Size)
                .ToListAsync();

            foreach (var comment in comments)
            {
                var interaction = await _context.CommentInteractions
                    .FirstOrDefaultAsync(ci => ci.UserId == userId && ci.CommentId == comment.Id);

                if (interaction != null)
                {
                    comment.UserInteraction = interaction.Type;
                }
                else
                {
                    comment.UserInteraction = null;
                }
            }

            return comments;
        }

        public async Task Save(Comment comment)
        {
            _context.Add(comment);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Comment comment)
        {
            _context.Update(comment);
            await _context.SaveChangesAsync();
        }
    }
}