using Application.Responses;
using MediatR;

namespace Application.Commands.Users
{
    public class ListUsersCommand : IRequest<IEnumerable<UserResponse>>
    {
        
    }
}