namespace Application.Responses
{
    public class CommentResponse
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public UserResponse User { get; set; }
        public Guid PostId { get; set; }
        public int Likes { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public DateTime? ModifiedAtUtc { get; set; }
    }
}
