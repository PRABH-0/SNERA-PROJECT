namespace Snera_Core.Models.UserPostModels
{
    public class PostCommentResultModel
    {
        public int CommentsCount { get; set; }
        public List<PostCommentResponseModel> PostComments { get; set; }
    }
}
