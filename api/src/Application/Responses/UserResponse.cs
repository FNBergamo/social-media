namespace Application.Responses
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Username { get; set; }
        public string? ProfilePicture { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
