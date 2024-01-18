using Domain.Enums;
using Domain.Primitives;

namespace Domain.Entitties
{
    public class Post : IAuditableEntity
    {
        public Guid Id { get; private set; } = new Guid();
        public string Text { get; private set; }
        public string Image { get; private set; } = string.Empty;
        public User User { get; private set; }
        public Guid UserId { get; private set; }
        public bool IsPrivate { get; private set; } = false;
        public bool IsHidden { get; private set; } = false;
        public int Likes { get; private set; } = 0;
        public DateTime CreteadAtUtc { get; set; }
        public DateTime? ModifiedAtUtc { get; set; }
        public InteractionType? UserInteraction { get; set; }
        private Post(){}

        public Post(string text, string image, User user, bool isPrivate, bool isHidden)
        {
            Text = text;
            Image = image;
            User = user;
            UserId = user.Id;   
            IsPrivate = isPrivate;
            IsHidden = isHidden;
        }

        public void Update(bool isPrivate, bool isHidden){
            IsPrivate = isPrivate;
            IsHidden = isHidden;
        }

        public void UpdateLikeCount(int likes){
            Likes = likes;
        }
    }
}