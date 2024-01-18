using MediatR;

namespace Application.Commands.Posts
{
    public class UpdatePostCommand : IRequest
    {
        public Guid Id {get; private set; }
        public bool IsPrivate {get; set; }
        public bool IsHidden {get; set; }

        public void AssignId(Guid id){
            Id = id;
        }
    }
}