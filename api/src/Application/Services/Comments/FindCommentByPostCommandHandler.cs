using Application.Commands.Comments;
using Application.Interfaces;
using Application.Mappers;
using Application.Responses;
using Domain.Entitties;
using Domain.Interfaces;
using Domain.Primitives;
using Domain.ValueObjects;
using MediatR;

namespace Application.Services.Comments
{
    public class FindCommentsByPostCommandHandler : IRequestHandler<FindCommentsByPostCommand, IEnumerable<CommentResponse>>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly ILoggedUserService _loggedUserService;

        public FindCommentsByPostCommandHandler(ICommentRepository commentRepository, ILoggedUserService loggedUserService)
        {
            _commentRepository = commentRepository;
            _loggedUserService = loggedUserService;
        }

        public async Task<IEnumerable<CommentResponse>> Handle(FindCommentsByPostCommand request, CancellationToken cancellationToken)
        {   
            User loggedUser = await _loggedUserService.GetCurrentUser();

            IPageable pageable = new Pageable(request.Page, request.Size);

            IEnumerable<Comment> comments = await _commentRepository.ListByPost(request.PostId, loggedUser.Id, pageable);
            
            var commentResponses = new List<CommentResponse>();
            
            foreach (var comment in comments)
            {
                CommentResponse response = CommentMapper.MapToCommentResponse(comment);
                commentResponses.Add(response);
            }

            return commentResponses;
        }   
    }
}