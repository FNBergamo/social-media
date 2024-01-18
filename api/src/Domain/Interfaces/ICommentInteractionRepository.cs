using Domain.Entitties;

namespace Domain.Interfaces
{
    public interface ICommentInteractionRepository
    {
        Task Save(CommentInteraction commentInteraction);
        Task Update(CommentInteraction commentInteraction);    
        Task Delete(CommentInteraction commentInteraction);    
        Task<IEnumerable<CommentInteraction>> List();  
        Task<CommentInteraction?> GetByUserAndComment(Guid userId, Guid commentId);
        Task<int> GetCommentLikesCount(Guid commentId);
    }
}