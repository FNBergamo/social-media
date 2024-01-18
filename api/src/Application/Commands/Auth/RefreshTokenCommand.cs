using MediatR;

namespace Application.Commands.Auth
{
    public class RefreshTokenCommand : IRequest
    {
        public string RefreshToken {get; set; }
    }
}