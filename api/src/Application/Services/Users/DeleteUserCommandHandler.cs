using Application.Commands.Users;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Users
{
    public class DeleteUserCommandHandler: IRequestHandler<DeleteUserCommand>
    {
        private readonly IUserRepository _userRepository;
    
        public DeleteUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task Handle(DeleteUserCommand command, CancellationToken cancellationToken)
        {   
            User? user = await _userRepository.GetById(command.Id);
            
            if(user is null) {
                throw new Exception("Usuário não encontrado");
            }

            await _userRepository.Delete(user);
        }
    }
}