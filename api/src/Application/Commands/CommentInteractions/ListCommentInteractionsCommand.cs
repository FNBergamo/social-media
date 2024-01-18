using Domain.Entitties;
using MediatR;

namespace Application.Commands.CommentInteractions
{
    public class ListCommentInteractionsCommand : IRequest<IEnumerable<CommentInteraction>>
    {
        
    }
}