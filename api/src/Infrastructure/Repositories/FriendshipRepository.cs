using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class FriendshipRepository : IFriendshipRepository
    {
        private readonly SocialMediaContext _context;

        public FriendshipRepository(SocialMediaContext context)
        {
            _context = context;
        }

        public async Task<Friendship?> GetById(Guid id)
        {
            return await _context.Friendships.FindAsync(id);
        }

        public async Task Save(Friendship friendship)
        {
            _context.Add(friendship);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Friendship friendship)
        {
             _context.Update(friendship);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Friendship friendship)
        {
            _context.Remove(friendship);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Friendship>> List()
        {
            return await _context.Friendships.ToListAsync();
        }

        public async Task<Friendship?> GetBySenderOrRequested(Guid senderId, Guid requestedId)
        {
            Friendship? friendship = await _context.Friendships.FirstOrDefaultAsync(friendship =>
                (friendship.SenderUserId == senderId && friendship.RequestedUserId == requestedId) ||
                (friendship.SenderUserId == requestedId && friendship.RequestedUserId == senderId));

            return friendship;
        }

        public async Task<IEnumerable<Friendship>> ListUserFriends(Guid userId)
        {
            return await _context.Friendships
                .Where(friendship =>
                    (friendship.SenderUserId == userId || friendship.RequestedUserId == userId) && 
                    friendship.Status == FriendshipStatus.Accepted)
                .ToListAsync();
        }

        public async Task<IEnumerable<Friendship>> ListUserBlockedUsers(Guid userId)
        {
            return await _context.Friendships
                .Where(friendship =>
                    (friendship.SenderUserId == userId || friendship.RequestedUserId == userId) && 
                    friendship.Status == FriendshipStatus.Blocked)
                .ToListAsync();
        }
    }
}