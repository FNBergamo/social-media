using Application.Responses;
using Domain.Enums;
using MediatR;

namespace Application.Commands.PostInteractions
{
    public class UpdatePostInteractionCommand : IRequest<UpdateInteractionReponse>
    {
        public required Guid UserId { get; set; }
        public required Guid PostId { get; set; }
        public required InteractionType Type { get; set; }
    }
}