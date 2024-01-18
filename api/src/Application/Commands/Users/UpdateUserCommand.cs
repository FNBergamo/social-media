using MediatR;

namespace Application.Commands.Users
{
    public class UpdateUserCommand : IRequest
    {
        public Guid Id { get; private set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string? ProfilePicture { get; set; }
        public string? Username { get; set; }

        public void AssignId(Guid id)
        {
            Id = id;
        }
    }
}
