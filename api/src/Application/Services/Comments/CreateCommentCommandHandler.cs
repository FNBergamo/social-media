using Application.Commands.Comments;
using Application.Mappers;
using Application.Responses;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Comments
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, CommentResponse>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;

        public CreateCommentCommandHandler(ICommentRepository commentRepository, IPostRepository postRepository,  IUserRepository userRepository)
        {
            _commentRepository = commentRepository;
            _postRepository = postRepository;
            _userRepository = userRepository;
        }

        public async Task<CommentResponse> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {   
            User? user = await _userRepository.GetById(request.UserId);

            if(user is null){
                throw new Exception("Usuário não encontrado");
            }

            Post? post = await _postRepository.GetById(request.PostId);

            if(post is null){
                throw new Exception("Post não encontrado");
            }
            
            Comment newComment = new(
              request.Text,
              user,
              post
            );

            await _commentRepository.Save(newComment);
            
            CommentResponse comment = CommentMapper.MapToCommentResponse(newComment);

            return comment;
        }   
    }
}