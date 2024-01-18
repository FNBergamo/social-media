namespace Application.Responses
{
    public class LoginResponse
    {
        public bool IsAuthenticated { get; set; } = false;
        public Guid Id { get; set; }
        public string Email { get; set; }
    }
}