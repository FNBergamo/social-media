using Domain.Entitties;
using MediatR;

namespace Application.Commands.PostInteractions
{
    public class ListPostInteractionsCommand : IRequest<IEnumerable<PostInteraction>>
    {
        
    }
}