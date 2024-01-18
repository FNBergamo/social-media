using Domain.Entitties;

namespace Domain.Interfaces
{
    public interface IPostInteractionRepository
    {
        Task Save(PostInteraction postInteraction);
        Task Update(PostInteraction postInteraction);    
        Task Delete(PostInteraction postInteraction);    
        Task<IEnumerable<PostInteraction>> List();  
        Task<PostInteraction?> GetByUserAndPost(Guid userId, Guid postId);
        Task<int> GetPostLikesCount(Guid postId);
    }
}