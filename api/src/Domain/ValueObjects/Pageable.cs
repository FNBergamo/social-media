using Domain.Primitives;

namespace Domain.ValueObjects
{
    public class Pageable : IPageable
    {
        public int Page { get; set; }
        public int Size { get; set; }
    
        public Pageable(int page, int size)
        {
            Page = page;
            Size = size;
        }
    }
}