using Application.Commands.Friendships;
using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Friendships
{
    public class CreateFriendshipRequestCommandHandler : IRequestHandler<CreateFriendshipRequestCommand>
    {
        private readonly IFriendshipRepository _friendshipRepository;
        private readonly IUserRepository _userRepository;

        public CreateFriendshipRequestCommandHandler(IFriendshipRepository friendshipRepository,  IUserRepository userRepository)
        {
            _friendshipRepository = friendshipRepository;
            _userRepository = userRepository;
        }

        public async Task Handle(CreateFriendshipRequestCommand request, CancellationToken cancellationToken)
        {   
            User? senderUser = await _userRepository.GetById(request.SenderUserId);
            
            if(senderUser is null){
                throw new Exception("Usuário solicitante não encontrado");
            }
            
            User? requestedUser = await _userRepository.GetById(request.RequestedUserId);
            
            if(requestedUser is null){
                throw new Exception("Usuário solicitado não encontrado");
            }
            
            Friendship friendship = new Friendship(senderUser, requestedUser, FriendshipStatus.Waiting);

            await _friendshipRepository.Save(friendship);
        }
    }
}