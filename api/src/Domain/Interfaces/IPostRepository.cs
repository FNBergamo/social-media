using Domain.Entitties;
using Domain.Primitives;

namespace Domain.Interfaces
{
    public interface IPostRepository
    {
        Task Save(Post post);
        Task<Post?> GetById(Guid id);
        Task Update(Post post);
        Task Delete(Post post);    
        Task<IEnumerable<Post>> List(Guid userId, IPageable pageable);
    }
}