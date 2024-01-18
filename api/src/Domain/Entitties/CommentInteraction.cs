using Domain.Enums;
using Domain.Primitives;

namespace Domain.Entitties
{
    public class CommentInteraction : IAuditableEntity
    {
        public Guid Id { get; private set; } = new Guid();
        public User User { get; private set; }
        public Guid UserId { get; private set; }
        public Comment Comment { get; private set; }
        public Guid CommentId { get; private set; }
        public InteractionType Type { get; private set; }
        public DateTime CreteadAtUtc { get; set; }
        public DateTime? ModifiedAtUtc { get; set; }

        private CommentInteraction(){}
        public CommentInteraction(User user, Comment comment, InteractionType type)
        {
            User = user;
            UserId = user.Id;
            Comment = comment;
            CommentId = comment.Id;
            Type = type;
        }

        public void UpdateInteraction(InteractionType type){
            Type = type;
        }
    }
}