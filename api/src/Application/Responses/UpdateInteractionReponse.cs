using Domain.Enums;

namespace Application.Responses
{
    public class UpdateInteractionReponse
    {
        public int Likes { get; set; }
        public InteractionType Interaction { get; set; }
    }
}