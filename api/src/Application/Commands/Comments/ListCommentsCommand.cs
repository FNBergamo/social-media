using Domain.Entitties;
using MediatR;

namespace Application.Commands.Comments
{
    public class ListCommentsCommand : IRequest<IEnumerable<Comment>>
    {
        
    }
}