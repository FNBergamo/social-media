using Domain.ValueObjects;
using MediatR;

namespace Application.Commands.Users
{
        public class CreateUserCommand : IRequest<AuthenticatedInfo>
        {
                public required string Name { get; set; }
                public required string Password { get; set; }
                public string? Username { get; set; }
                public required string Email { get; set; }
                public string? ProfilePicture { get; set; }
                public required DateTime BirthDate { get; set; }
        }
}
