using Application.Commands.Comments;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Comments
{
    public class FindCommentByIdCommandHandler : IRequestHandler<FindCommentByIdCommand, Comment>
    {
        private readonly ICommentRepository _commentRepository;

        public FindCommentByIdCommandHandler(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<Comment> Handle(FindCommentByIdCommand request, CancellationToken cancellationToken)
        {   
            Comment? comment = await _commentRepository.GetById(request.Id);

            if(comment is null){
                throw new Exception("Comentário não encontrado");
            }

            return comment;
        }   
    }
}