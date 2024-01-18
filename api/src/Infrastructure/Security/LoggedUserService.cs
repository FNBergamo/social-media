using Application.Interfaces;
using Domain.Entitties;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class LoggedUserService : ILoggedUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
    
        public LoggedUserService(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<User?> GetCurrentUser()
        {
            var loggedUserId = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type.Equals("Id"))?.Value;

            if (loggedUserId != null && Guid.TryParse(loggedUserId, out Guid userId))
            {
                return await _userRepository.GetById(userId);
            }

            return null;
        }

        public async Task<bool> IsAuthorized(Guid userId)
        {
            User? loggedUser = await GetCurrentUser();

            if (loggedUser != null)
            {
                return loggedUser.Id.Equals(userId);
            }

            return false;
        }
    }
}
