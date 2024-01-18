using Application.Responses;
using Domain.Enums;
using MediatR;

namespace Application.Commands.CommentInteractions
{
    public class UpdateCommentInteractionCommand : IRequest<UpdateInteractionReponse>
    {
        public required Guid UserId { get; set; }
        public required Guid CommentId { get; set; }
        public required InteractionType Type { get; set; }
    }
}