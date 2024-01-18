using Domain.Entitties;

namespace Application.Interfaces
{
    public interface ILoggedUserService
    {
        Task<User?> GetCurrentUser();
        Task<bool> IsAuthorized(Guid userId);
    }
}