using Domain.Entitties;
using MediatR;

namespace Application.Commands.Friendships
{
    public class ListFriendshipRequestsCommand : IRequest<IEnumerable<Friendship>>
    {
        
    }
}