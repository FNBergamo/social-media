using Application.Commands.Users;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Users
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand>
    {
        private readonly IUserRepository _userRepository;
    
        public UpdateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task Handle(UpdateUserCommand command, CancellationToken cancellationToken)
        {   
            User? user = await _userRepository.GetById(command.Id);
            
            if(user is null) {
                throw new Exception("Usuário não encontrado");
            }

            user.Update(command.Name, command.Password, command?.ProfilePicture, command?.Username);

            await _userRepository.Update(user);
        }
    }
}