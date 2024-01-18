using Application.Commands.CommentInteractions;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.CommentInteractions
{
    public class ListCommentInteractionsCommandHandler : IRequestHandler<ListCommentInteractionsCommand, IEnumerable<CommentInteraction>>
    {
        private readonly ICommentInteractionRepository _commentInteractionRepository;

        public ListCommentInteractionsCommandHandler(ICommentInteractionRepository commentInteractionRepository)
        {
            _commentInteractionRepository = commentInteractionRepository;
        }

        public async Task<IEnumerable<CommentInteraction>> Handle(ListCommentInteractionsCommand request, CancellationToken cancellationToken)
        {
            return await _commentInteractionRepository.List();
        }
    }
}