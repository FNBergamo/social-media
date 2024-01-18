using Application.Responses;
using Domain.Entitties;

namespace Application.Mappers
{
    public static class UserMapper
    {
        public static UserResponse MapToUserResponse(User user)
        {
            return new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Username = user.Username,
                ProfilePicture = user.ProfilePicture,
                BirthDate = user.BirthDate
            };
        }
    }
}
