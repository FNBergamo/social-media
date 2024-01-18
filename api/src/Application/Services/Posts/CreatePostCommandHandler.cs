using Application.Commands.Posts;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Posts
{
    public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand>
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;

        public CreatePostCommandHandler(IPostRepository postRepository,  IUserRepository userRepository)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
        }

        public async Task Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {   
            User? user = await _userRepository.GetById(request.UserId);

            if(user is null){
                throw new Exception("Usuário não encontrado");
            }
            
            Post newPost = new(
              request.Text,
              request.Image,
              user,
              request.IsPrivate,
              request.IsHidden
            );

            await _postRepository.Save(newPost);
        }
    }
}