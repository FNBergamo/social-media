using Domain.Entitties;
using MediatR;

namespace Application.Commands.Friendships
{
    public class ListUserBlockedUsersCommand : IRequest<IEnumerable<Friendship>>
    {
        public Guid Id {get; private set; }

        public ListUserBlockedUsersCommand(Guid id){
            Id = id;
        }
    }
}