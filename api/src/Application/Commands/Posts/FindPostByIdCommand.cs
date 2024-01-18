using Domain.Entitties;
using MediatR;

namespace Application.Commands.Posts
{
    public class FindPostByIdCommand : IRequest<Post>
    {
        public Guid Id {get; private set; }

        public FindPostByIdCommand(Guid id){
            Id = id;
        }
    }
}