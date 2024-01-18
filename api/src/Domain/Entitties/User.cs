using Domain.Primitives;

namespace Domain.Entitties
{
    public class User : IAuditableEntity
    {
        public Guid Id { get; private set; } = new Guid();
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }
        public string? Username { get; private set; }
        public string? ProfilePicture { get; private set; }
        public DateTime BirthDate { get; private set; }
        public DateTime CreteadAtUtc { get; set; }
        public DateTime? ModifiedAtUtc { get; set; }

        private User(){}
        public User(string name, string email, string passwordHash, string username, string profilePicture, DateTime birthDate)
        {
            Name = name;
            Email = email;
            PasswordHash = passwordHash;
            Username = username;
            ProfilePicture = profilePicture;
            BirthDate = birthDate;
        }

        public void Update(string name, string passwordHash, string? profilePicture, string? username)
        {
            Name = name;
            PasswordHash = passwordHash;
            ProfilePicture = profilePicture;
            Username = username;
        }
    }
}