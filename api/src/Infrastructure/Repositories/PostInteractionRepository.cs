using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class PostInteractionRepository : IPostInteractionRepository
    {
        private readonly SocialMediaContext _context;

        public PostInteractionRepository(SocialMediaContext context)
        {
            _context = context;
        }

        public async Task Save(PostInteraction postInteraction)
        {
            _context.Add(postInteraction);
            await _context.SaveChangesAsync();
        }

        public async Task Update(PostInteraction postInteraction)
        {
            _context.Update(postInteraction);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(PostInteraction postInteraction)
        {
            _context.Remove(postInteraction);
            await _context.SaveChangesAsync();
        }

        public async Task<PostInteraction?> GetByUserAndPost(Guid userId, Guid postId)
        {
            return await _context.PostInteractions.FirstOrDefaultAsync(pi => pi.UserId == userId && pi.PostId == postId);
        }

        public async Task<IEnumerable<PostInteraction>> List()
        {
            return await _context.PostInteractions.ToListAsync();
        }

        public async Task<int> GetPostLikesCount(Guid postId)
        {
            int upvotes = await _context.PostInteractions
                .Where(pi => pi.PostId == postId && pi.Type == InteractionType.Upvote)
                .CountAsync();

            int downvotes = await _context.PostInteractions
                .Where(pi => pi.PostId == postId && pi.Type == InteractionType.Downvote)
                .CountAsync();

            int likesCount = upvotes - downvotes;
            return likesCount;
        }
    }
}