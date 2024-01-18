using Application.Commands.Posts;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Posts
{
    public class FindPostByIdCommandHandler : IRequestHandler<FindPostByIdCommand, Post>
    {
        private readonly IPostRepository _postRepository;

        public FindPostByIdCommandHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<Post> Handle(FindPostByIdCommand request, CancellationToken cancellationToken)
        {   
            Post? post = await _postRepository.GetById(request.Id);

            if(post is null){
                throw new Exception("Post não encontrado");
            }
            
            return post;
        }
        
    }
}