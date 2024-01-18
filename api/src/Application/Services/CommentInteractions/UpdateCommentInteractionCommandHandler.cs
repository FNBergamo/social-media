using Application.Commands.CommentInteractions;
using Application.Responses;
using Domain.Entitties;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.CommentInteractions
{
    public class UpdateCommentInteractionCommandHandler : IRequestHandler<UpdateCommentInteractionCommand, UpdateInteractionReponse>
    {
        private readonly ICommentInteractionRepository _commentInteractionRepository;
        private readonly IUserRepository _userRepository;
        private readonly ICommentRepository _commentRepository;

        public UpdateCommentInteractionCommandHandler(ICommentInteractionRepository commentInteractionRepository, IUserRepository userRepository, ICommentRepository commentRepository)
        {
            _commentInteractionRepository = commentInteractionRepository;
            _userRepository = userRepository;
            _commentRepository = commentRepository;
        }

        public async Task<UpdateInteractionReponse> Handle(UpdateCommentInteractionCommand request, CancellationToken cancellationToken)
        {
            User? user = await _userRepository.GetById(request.UserId);

            if(user is null){
                throw new Exception("Usuário não encontrado");
            }

            Comment? comment = await _commentRepository.GetById(request.CommentId);

            if(comment is null){
                throw new Exception("Comment não encontrado");
            }

            CommentInteraction? interaction = await _commentInteractionRepository.GetByUserAndComment(request.UserId, request.CommentId);

            var lastInteraction = request.Type;

            if(interaction is null){
                CommentInteraction newInteraction = new(user, comment, request.Type);
                await _commentInteractionRepository.Save(newInteraction);
            } else if(interaction.Type == request.Type) {
                await _commentInteractionRepository.Delete(interaction);
                lastInteraction = InteractionType.NoInteraction;
            } else {
                interaction.UpdateInteraction(request.Type);
                await _commentInteractionRepository.Update(interaction);
            }

            int likesCount = await _commentInteractionRepository.GetCommentLikesCount(request.CommentId);
            comment.UpdateLikeCount(likesCount);
            await _commentRepository.Update(comment);

            UpdateInteractionReponse response = new()
            {
                Likes = likesCount,
                Interaction = lastInteraction
            };

            return response;
        }
    }
}
