using Application.Responses;
using Domain.Entitties;
using Domain.Primitives;
using MediatR;

namespace Application.Commands.Comments
{
    public class FindCommentsByPostCommand : IRequest<IEnumerable<CommentResponse>>, IPageable
    {
        public Guid PostId {get; private set; }
        public int Page { get; set; } = 1;
        public int Size { get; set; } = 3;

        public void AssignId(Guid id){
            PostId = id;
        }
    }
}
