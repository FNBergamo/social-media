using Application.Commands.Users;
using Application.Helper;
using Domain.Entitties;
using Domain.Interfaces;
using Domain.ValueObjects;
using MediatR;

namespace Application.Services.Users
{
    public class ValidateLoginCommandHandler : IRequestHandler<LoginCommand, AuthenticatedInfo>
    {
        private readonly IUserRepository _userRepository;
        
        public ValidateLoginCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<AuthenticatedInfo> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            string hashedPassword = HashHelper.Hash(request.Password);

            User? user = _userRepository.GetUser(request.Email, hashedPassword);

            if (user == null)
                throw new Exception("User not found or invalid credentials.");

            AuthenticatedInfo authenticatedInfo = new() { IsAuthenticated = true, Id = user.Id, Email = user.Email };

            return Task.FromResult(authenticatedInfo);
        }
    }
}

