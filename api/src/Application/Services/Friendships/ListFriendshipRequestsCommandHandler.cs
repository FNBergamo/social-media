using Application.Commands.Friendships;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Friendships
{
    public class ListFriendshipRequestsCommandHandler : IRequestHandler<ListFriendshipRequestsCommand, IEnumerable<Friendship>>
    {
        private readonly IFriendshipRepository _friendshipRepository;

        public ListFriendshipRequestsCommandHandler(IFriendshipRepository friendshipRepository)
        {
            _friendshipRepository = friendshipRepository;
        }

        public async Task<IEnumerable<Friendship>> Handle(ListFriendshipRequestsCommand request, CancellationToken cancellationToken)
        {
            return await _friendshipRepository.List();       
        }
    }
}