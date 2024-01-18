using Application.Commands.Comments;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Comments
{
    public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
    {
        private readonly ICommentRepository _commentRepository;

        public DeleteCommentCommandHandler(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {   
            Comment? comment = await _commentRepository.GetById(request.Id);

            if(comment is null){
                throw new Exception("Comentário não encontrado");
            }

            await _commentRepository.Delete(comment);
        }   
    }
}