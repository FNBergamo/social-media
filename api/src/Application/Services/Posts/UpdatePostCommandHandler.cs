using Application.Commands.Posts;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Posts
{
    public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand>
    {
        private readonly IPostRepository _postRepository;

        public UpdatePostCommandHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task Handle(UpdatePostCommand request, CancellationToken cancellationToken)
        {
            Post? post = await _postRepository.GetById(request.Id);

            if(post is null){
                throw new Exception("Post não encontrado");
            }

            post.Update(request.IsPrivate, request.IsHidden);

            await _postRepository.Update(post);
        }
    }
}