using Application.Responses;
using MediatR;

namespace Application.Commands.Users
{
    public class FindUserByIdCommand : IRequest<UserResponse>
    {
        public Guid Id {get; private set; }

        public FindUserByIdCommand(Guid id){
            Id = id;
        }
    }
}