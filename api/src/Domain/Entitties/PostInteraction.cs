using Domain.Enums;
using Domain.Primitives;

namespace Domain.Entitties
{
    public class PostInteraction : IAuditableEntity
    {
        public Guid Id { get; private set; } = new Guid();
        public User User { get; private set; }
        public Guid UserId { get; private set; }
        public Post Post { get; private set; }
        public Guid PostId { get; private set; }
        public InteractionType Type { get; private set; }
        public DateTime CreteadAtUtc { get; set; }
        public DateTime? ModifiedAtUtc { get; set; }
    
        private PostInteraction(){}
        public PostInteraction(User user, Post post, InteractionType type)
        {
            User = user;
            UserId = user.Id;
            Post = post;
            PostId = post.Id;
            Type = type;
        }

        public void UpdateInteraction(InteractionType type){
            Type = type;
        }
    }
}