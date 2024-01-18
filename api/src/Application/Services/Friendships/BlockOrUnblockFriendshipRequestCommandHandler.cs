using Application.Commands.Friendships;
using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Friendships
{
    public class BlockOrUnblockFriendshipRequestCommandHandler : IRequestHandler<BlockOrUnblockFriendshipRequestCommand>
    {
        private readonly IFriendshipRepository _friendshipRepository;
        private readonly IUserRepository _userRepository;

        public BlockOrUnblockFriendshipRequestCommandHandler(IFriendshipRepository friendshipRepository,  IUserRepository userRepository)
        {
            _friendshipRepository = friendshipRepository;
            _userRepository = userRepository;
        }

        public async Task Handle(BlockOrUnblockFriendshipRequestCommand request, CancellationToken cancellationToken)
        {   
            User? senderUser = await _userRepository.GetById(request.SenderUserId);
            
            if(senderUser is null){
                throw new Exception("Usuário solicitante não encontrado");
            }
            
            User? requestedUser = await _userRepository.GetById(request.RequestedUserId);
            
            if(requestedUser is null){
                throw new Exception("Usuário solicitado não encontrado");
            }
            
            Friendship? friendship = await _friendshipRepository.GetBySenderOrRequested(senderUser.Id, requestedUser.Id);

            if(friendship is null){
                throw new Exception("Solicitação não encontrada");
            }

            if(friendship.Status == FriendshipStatus.Blocked){
                await _friendshipRepository.Delete(friendship);
                return;
            }

            friendship.UpdateStatus(FriendshipStatus.Blocked);
            
            await _friendshipRepository.Update(friendship);
        }
    }
}