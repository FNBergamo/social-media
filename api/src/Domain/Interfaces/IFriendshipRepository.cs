using Domain.Entitties;
using Domain.Enums;

namespace Domain.Interfaces
{
    public interface IFriendshipRepository
    {
        Task Save(Friendship friendship);
        Task<Friendship?> GetById(Guid id);
        Task<Friendship?> GetBySenderOrRequested(Guid senderId, Guid requestedId);
        Task Update(Friendship friendship);
        Task Delete(Friendship friendship);    
        Task<IEnumerable<Friendship>> List();  
        Task<IEnumerable<Friendship>> ListUserFriends(Guid userId);
        Task<IEnumerable<Friendship>> ListUserBlockedUsers(Guid userId);
    }
}