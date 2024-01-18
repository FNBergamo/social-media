using Application.Commands.Friendships;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Friendships
{
    public class ListUserFriendsCommandHandler : IRequestHandler<ListUserFriendsCommand, IEnumerable<Friendship>>
    {
        private readonly IFriendshipRepository _friendshipRepository;

        public ListUserFriendsCommandHandler(IFriendshipRepository friendshipRepository)
        {
            _friendshipRepository = friendshipRepository;
        }

        public async Task<IEnumerable<Friendship>> Handle(ListUserFriendsCommand request, CancellationToken cancellationToken)
        {
            return await _friendshipRepository.ListUserFriends(request.Id);       
        }
    }
}