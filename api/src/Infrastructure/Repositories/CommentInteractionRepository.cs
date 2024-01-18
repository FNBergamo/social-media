using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentInteractionRepository : ICommentInteractionRepository
    {
        private readonly SocialMediaContext _context;

        public CommentInteractionRepository(SocialMediaContext context)
        {
            _context = context;
        }

        public async Task Save(CommentInteraction commentInteraction)
        {
            _context.Add(commentInteraction);
            await _context.SaveChangesAsync();
        }

        public async Task Update(CommentInteraction commentInteraction)
        {
            _context.Update(commentInteraction);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(CommentInteraction commentInteraction)
        {
            _context.Remove(commentInteraction);
            await _context.SaveChangesAsync();
        }

        public async Task<CommentInteraction?> GetByUserAndComment(Guid userId, Guid commentId)
        {
            return await _context.CommentInteractions.FirstOrDefaultAsync(pi => pi.UserId == userId && pi.CommentId == commentId);
        }

        public async Task<IEnumerable<CommentInteraction>> List()
        {
            return await _context.CommentInteractions.ToListAsync();
        }

        public async Task<int> GetCommentLikesCount(Guid commentId)
        {
            int upvotes = await _context.CommentInteractions
                .Where(pi => pi.CommentId == commentId && pi.Type == InteractionType.Upvote)
                .CountAsync();

            int downvotes = await _context.CommentInteractions
                .Where(pi => pi.CommentId == commentId && pi.Type == InteractionType.Downvote)
                .CountAsync();

            int likesCount = upvotes - downvotes;
            return likesCount;
        }
    }
}