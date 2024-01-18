using Domain.Entitties;
using MediatR;

namespace Application.Commands.Comments
{
    public class FindCommentByIdCommand : IRequest<Comment>
    {
        public Guid Id {get; private set; }

        public FindCommentByIdCommand(Guid id){
            Id = id;
        }
    }
}