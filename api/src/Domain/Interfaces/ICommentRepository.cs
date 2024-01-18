using Domain.Entitties;
using Domain.Primitives;

namespace Domain.Interfaces
{
    public interface ICommentRepository
    {
        Task Save(Comment comment);
        Task<Comment?> GetById(Guid id);
        Task Update(Comment comment);
        Task Delete(Comment comment);    
        Task<IEnumerable<Comment>> List();        
        Task<IEnumerable<Comment>> ListByPost(Guid postId, Guid userId, IPageable pageable);        
    }
}