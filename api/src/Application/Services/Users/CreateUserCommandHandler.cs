using Application.Commands.Users;
using Application.Helper;
using Domain.Entitties;
using Domain.Interfaces;
using Domain.ValueObjects;
using MediatR;

namespace Application.Services.Users
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, AuthenticatedInfo>
    {
        private readonly IUserRepository _userRepository;
        
        public CreateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<AuthenticatedInfo> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {   
            string hashedPassword = HashHelper.Hash(request.Password);

            User newUser = new User (
                request.Name, 
                request.Email, 
                hashedPassword, 
                request.Username, 
                request.ProfilePicture, 
                request.BirthDate
            );

            await _userRepository.Save(newUser);

            AuthenticatedInfo authenticatedInfo = new() { IsAuthenticated = true, Id = newUser.Id, Email = newUser.Email };

            return authenticatedInfo;
        }
    }
}
