using Application.Responses;
using Domain.Entitties;

namespace Application.Mappers
{
    public class CommentMapper
    {
         public static CommentResponse MapToCommentResponse(Comment comment)
        {
            return new CommentResponse
            {
                Id = comment.Id,
                Text = comment.Text,
                User = UserMapper.MapToUserResponse(comment.User),
                PostId = comment.PostId,
                Likes = comment.Likes,
                CreatedAtUtc = comment.CreteadAtUtc,
                ModifiedAtUtc = comment.ModifiedAtUtc
            };
        }
    }
}