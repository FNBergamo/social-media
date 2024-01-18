using MediatR;

namespace Application.Commands.Friendships
{
    public class AcceptFriendshipRequestCommand : IRequest
    {
        public required Guid SenderUserId { get; set; }
        public required Guid RequestedUserId { get; set; }
    }
}