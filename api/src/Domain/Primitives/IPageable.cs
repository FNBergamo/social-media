namespace Domain.Primitives
{
    public interface IPageable
    {
        int Page {get; set;}
        int Size {get; set;}
    }
}