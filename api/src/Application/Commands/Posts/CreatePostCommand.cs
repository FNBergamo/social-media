using MediatR;

namespace Application.Commands.Posts
{
    public class CreatePostCommand : IRequest
    {
        public required string Text { get; set; }
        public string Image { get; set; }
        public required Guid UserId { get; set; }
        public bool IsPrivate { get; set; }
        public bool IsHidden { get; set; }
    }
}