using Application.Commands.Users;
using Application.Mappers;
using Application.Responses;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Users
{
    public class FindUserByIdCommandHandler : IRequestHandler<FindUserByIdCommand, UserResponse>
    {
        private readonly IUserRepository _userRepository;
    
        public FindUserByIdCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponse> Handle(FindUserByIdCommand command, CancellationToken cancellationToken)
        {   
            User? user = await _userRepository.GetById(command.Id);
            
            if(user is null){
                throw new Exception("Usuário não encontrado");
            }

            UserResponse userResponse = UserMapper.MapToUserResponse(user);

            return userResponse;
        }
    }
}