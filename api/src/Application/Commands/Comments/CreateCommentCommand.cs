using Application.Responses;
using MediatR;

namespace Application.Commands.Comments
{
    public class CreateCommentCommand : IRequest<CommentResponse>
    {
        public required string Text { get; set; }
        public required Guid UserId { get; set; }
        public required Guid PostId { get; set; }
    }
}