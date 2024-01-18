using MediatR;

namespace Application.Commands.Friendships
{
    public class DenyOrUndoFriendshipRequestCommand : IRequest
    {
        public required Guid SenderUserId { get; set; }
        public required Guid RequestedUserId { get; set; }
    }
}