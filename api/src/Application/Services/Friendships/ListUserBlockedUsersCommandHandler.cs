using Application.Commands.Friendships;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Friendships
{
    public class ListUserBlockedUsersCommandHandler : IRequestHandler<ListUserBlockedUsersCommand, IEnumerable<Friendship>>
    {
        private readonly IFriendshipRepository _friendshipRepository;

        public ListUserBlockedUsersCommandHandler(IFriendshipRepository friendshipRepository)
        {
            _friendshipRepository = friendshipRepository;
        }

        public async Task<IEnumerable<Friendship>> Handle(ListUserBlockedUsersCommand request, CancellationToken cancellationToken)
        {
            return await _friendshipRepository.ListUserBlockedUsers(request.Id);       
        }
    }
}