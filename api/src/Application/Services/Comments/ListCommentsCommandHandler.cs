using Application.Commands.Comments;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Comments
{
    public class ListCommentsCommandHandler : IRequestHandler<ListCommentsCommand, IEnumerable<Comment>>
    {
        private readonly ICommentRepository _commentRepository;

        public ListCommentsCommandHandler(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<IEnumerable<Comment>> Handle(ListCommentsCommand request, CancellationToken cancellationToken)
        {   
            IEnumerable<Comment> comments = await _commentRepository.List();

            return comments;
        }   
    }
}