using MediatR;

namespace Application.Commands.Comments
{
    public class DeleteCommentCommand : IRequest
    {
        public Guid Id {get; private set; }

        public DeleteCommentCommand(Guid id){
            Id = id;
        }
    }
}