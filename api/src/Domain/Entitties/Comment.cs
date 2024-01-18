using Domain.Enums;
using Domain.Primitives;

namespace Domain.Entitties
{
    public class Comment : IAuditableEntity
    {
        public Guid Id { get; private set; } = new Guid();
        public string Text { get; private set; }
        public User User { get; private set; }
        public Guid UserId { get; private set; }
        public Post Post { get; private set; }
        public Guid PostId { get; private set; }
        public int Likes { get; private set; } = 0;
        public DateTime CreteadAtUtc { get; set; }
        public DateTime? ModifiedAtUtc { get; set; }
        public InteractionType? UserInteraction { get; set; }

        private Comment(){}

        public Comment(string text, User user, Post post)
        {
            Text = text;
            User = user;
            UserId = UserId;
            Post = post;
            PostId = PostId;
        }

        public void UpdateLikeCount(int likes){
            Likes = likes;
        }
    }
}