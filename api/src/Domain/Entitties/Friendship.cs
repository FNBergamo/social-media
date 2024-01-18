using Domain.Enums;
using Domain.Primitives;

namespace Domain.Entitties
{
    public class Friendship : IAuditableEntity
    {
        public Guid Id { get; private set; } = new Guid();
        public User SenderUser { get; private set; }
        public Guid SenderUserId { get; private set; }
        public User RequestedUser { get; private set; }
        public Guid RequestedUserId { get; private set; }
        public FriendshipStatus Status { get; private set; }
        public DateTime CreteadAtUtc { get; set; }
        public DateTime? ModifiedAtUtc { get; set; }
    
        private Friendship(){}
        public Friendship(User senderUser, User requestedUser, FriendshipStatus status)
        {
            SenderUser = senderUser;
            SenderUserId = senderUser.Id;
            RequestedUser = requestedUser;
            RequestedUserId = requestedUser.Id;
            Status = status;
        }

        public void UpdateStatus(FriendshipStatus status){
            Status = status;
        }
    }
}