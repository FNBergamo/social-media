using Application.Commands.PostInteractions;
using Application.Responses;
using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.PostInteractions
{
    public class UpdatePostInteractionCommandHandler : IRequestHandler<UpdatePostInteractionCommand, UpdateInteractionReponse>
    {
        private readonly IPostInteractionRepository _postInteractionRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPostRepository _postRepository;

        public UpdatePostInteractionCommandHandler(IPostInteractionRepository postInteractionRepository, IUserRepository userRepository, IPostRepository postRepository)
        {
            _postInteractionRepository = postInteractionRepository;
            _userRepository = userRepository;
            _postRepository = postRepository;
        }

        public async Task<UpdateInteractionReponse> Handle(UpdatePostInteractionCommand request, CancellationToken cancellationToken)
        {
            User? user = await _userRepository.GetById(request.UserId);

            if(user is null){
                throw new Exception("Usuário não encontrado");
            }

            Post? post = await _postRepository.GetById(request.PostId);

            if(post is null){
                throw new Exception("Post não encontrado");
            }

            PostInteraction? interaction = await _postInteractionRepository.GetByUserAndPost(request.UserId, request.PostId);

            var lastInteraction = request.Type;

            if(interaction is null){
                PostInteraction newInteraction = new(user, post, request.Type);
                await _postInteractionRepository.Save(newInteraction);
            } else if(interaction.Type == request.Type) {
                await _postInteractionRepository.Delete(interaction);
                lastInteraction = InteractionType.NoInteraction;
            } else {
                interaction.UpdateInteraction(request.Type);
                await _postInteractionRepository.Update(interaction);
            }

            int likesCount = await _postInteractionRepository.GetPostLikesCount(request.PostId);
            post.UpdateLikeCount(likesCount);
            await _postRepository.Update(post);
            
            UpdateInteractionReponse response = new()
            {
                Likes = likesCount,
                Interaction = lastInteraction
            };

            return response;
        }
    }
}
