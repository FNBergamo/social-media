using Application.Commands.Posts;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Posts
{
    public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand>
    {
        private readonly IPostRepository _postRepository;


        public DeletePostCommandHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            Post post = await _postRepository.GetById(request.Id);

            if (post == null)
            {
                throw new Exception("Post não encontrado");
            }

            // Verifique as permissões do usuário, se necessário
            // string token = request.Token;
            // bool isPostOwner = await _loggedUserService.IsAuthorized(post.UserId); 

            // if(!isPostOwner){
            //     throw new Exception("Você não tem permissão para excluir este post");
            // }
            
            await _postRepository.Delete(post);
        }
    }
}
