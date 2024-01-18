using MediatR;

namespace Application.Commands.Users
{
    public class DeleteUserCommand : IRequest
    {
        public Guid Id { get; private set; }
        public void AssignId(Guid id)
        {
            Id = id;
        }
    }
}