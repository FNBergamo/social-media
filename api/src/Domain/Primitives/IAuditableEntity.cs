namespace Domain.Primitives
{
    public interface IAuditableEntity
    {
        DateTime CreteadAtUtc {get; set;}
        DateTime? ModifiedAtUtc {get; set;}
    }
}