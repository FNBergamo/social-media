using Application.Commands.Friendships;
using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Friendships
{
    public class DenyOrUndoFriendshipRequestCommandHandler : IRequestHandler<DenyOrUndoFriendshipRequestCommand>
    {
        private readonly IFriendshipRepository _friendshipRepository;
        private readonly IUserRepository _userRepository;

        public DenyOrUndoFriendshipRequestCommandHandler(IFriendshipRepository friendshipRepository,  IUserRepository userRepository)
        {
            _friendshipRepository = friendshipRepository;
            _userRepository = userRepository;
        }

        public async Task Handle(DenyOrUndoFriendshipRequestCommand request, CancellationToken cancellationToken)
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
                throw new Exception("Não foi possível completar a solicitação");
            }

            await _friendshipRepository.Delete(friendship);
        }
    }
}