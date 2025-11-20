namespace Snera_Core.Models.UserPostModels
{
    public class PostCommentModel
    {
        public string Post_Comment {  get; set; }
        public Guid User_Id { get; set; }
        public Guid Post_Id { get; set; }

    }
}
