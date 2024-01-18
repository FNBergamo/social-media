using Domain.Entitties;
using MediatR;

namespace Application.Commands.Friendships
{
    public class ListUserFriendsCommand : IRequest<IEnumerable<Friendship>>
    {
        public Guid Id {get; private set; }

        public ListUserFriendsCommand(Guid id){
            Id = id;
        }
    }
}