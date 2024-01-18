using MediatR;

namespace Application.Commands.Posts
{
    public class DeletePostCommand : IRequest
    {
        public Guid Id {get; private set; }

        public DeletePostCommand(Guid id){
            Id = id;
        }
    }
}