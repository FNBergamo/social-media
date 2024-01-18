namespace Domain.ValueObjects
{
    public struct AuthenticatedInfo
    {
        public bool IsAuthenticated { get; set; } = false;
        public Guid Id { get; set; }
        public string Email { get; set; }

        public AuthenticatedInfo(bool isAuthenticated, Guid id, string email)
        {
            IsAuthenticated = isAuthenticated;
            Id = id;
            Email = email;
        }
    }
}