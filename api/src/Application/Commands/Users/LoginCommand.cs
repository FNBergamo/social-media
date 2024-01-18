using Domain.ValueObjects;
using MediatR;

namespace Application.Commands.Users
{
        public class LoginCommand : IRequest<AuthenticatedInfo> 
        {
                public required string Email { get; set; }
                public required string Password { get; set; }
        }
}

