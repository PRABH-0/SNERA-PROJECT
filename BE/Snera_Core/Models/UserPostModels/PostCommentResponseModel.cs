namespace Snera_Core.Models.UserPostModels
{
    public class PostCommentResponseModel
    {
        public Guid Id { get; set; }
        public Guid Post_Id { get; set; }
        public Guid User_Id { get; set; }
        public string Avtar_Name { get; set; } =string.Empty;
        public string Author_Name { get; set; } = string.Empty;
        public string Comment_Text { get; set; } = string.Empty;
        public DateTime Created_Timestamp { get; set; } = DateTime.UtcNow;
    }
}
