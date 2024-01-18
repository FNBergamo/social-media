using Domain.Entitties;

namespace Domain.Interfaces
{
    public interface IUserRepository
    {
        Task Save(User user);
        User? GetUser(string email, string password);
        Task<User?> GetById(Guid id);
        Task Update(User user);
        Task Delete(User user);
        Task<IEnumerable<User>> List();
    }
}