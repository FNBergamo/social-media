using Domain.Entitties;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SocialMediaContext _context;

        public UserRepository(SocialMediaContext context)
        {
            _context = context;
        }

        public User? GetUser(string email, string password)
        {
            IEnumerable<User> users = _context.Users.ToList();

            User? user = users.FirstOrDefault(u =>
                string.Equals(u.Email, email, StringComparison.OrdinalIgnoreCase) &&
                u.PasswordHash == password);

            return user;
        }

        public async Task<User?> GetById(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task Save(User user)
        {
            _context.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task Update(User user)
        {
            _context.Update(user);
            await _context.SaveChangesAsync();

        }

        public async Task Delete(User user)
        {
            _context.Remove(user);
            await _context.SaveChangesAsync();
        }


        public async Task<IEnumerable<User>> List()
        {
            return await _context.Users.ToListAsync();
        }
    }
}