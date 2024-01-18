using Domain.Entitties;
using Domain.Primitives;
using MediatR;

namespace Application.Commands.Posts
{
    public class ListPostsCommand : IRequest<IEnumerable<Post>>, IPageable
    {
        public int Page { get; set; } = 1;
        public int Size { get; set; } = 10;
    }
}