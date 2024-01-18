using Application.Commands.PostInteractions;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.PostInteractions
{
    public class ListPostInteractionsCommandHandler : IRequestHandler<ListPostInteractionsCommand, IEnumerable<PostInteraction>>
    {
        private readonly IPostInteractionRepository _postInteractionRepository;

        public ListPostInteractionsCommandHandler(IPostInteractionRepository postInteractionRepository)
        {
            _postInteractionRepository = postInteractionRepository;
        }

        public async Task<IEnumerable<PostInteraction>> Handle(ListPostInteractionsCommand request, CancellationToken cancellationToken)
        {
            return await _postInteractionRepository.List();
        }
    }
}