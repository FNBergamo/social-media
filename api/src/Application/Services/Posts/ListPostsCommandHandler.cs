using Application.Commands.Posts;
using Application.Interfaces;
using Domain.Entitties;
using Domain.Interfaces;
using Domain.Primitives;
using Domain.ValueObjects;
using MediatR;

namespace Application.Services.Posts
{
    public class ListPostsCommandHandler : IRequestHandler<ListPostsCommand, IEnumerable<Post>>
    {
        private readonly IPostRepository _postRepository;
        private readonly ILoggedUserService _loggedUserService;


        public ListPostsCommandHandler(IPostRepository postRepository, ILoggedUserService loggedUserService)
        {
            _postRepository = postRepository;
            _loggedUserService = loggedUserService;
        }

        public async Task<IEnumerable<Post>> Handle(ListPostsCommand request, CancellationToken cancellationToken)
        {
            User loggedUser = await _loggedUserService.GetCurrentUser();

            IPageable pageable = new Pageable(request.Page, request.Size);

            return await _postRepository.List(loggedUser.Id, pageable);
        }
    }
}