using Microsoft.AspNetCore.Mvc;
using Snera_Core.Entities.PostEntities;
using Snera_Core.Models;
using Snera_Core.Models.UserPostModels;

namespace Snera_Core.Interface
{
    public interface IPostService
    {
        Task<string> CreateUserPost(UserPostDetailsModel post);
        Task<List<UserPostModel>> GetAllPostAsync(FilterModel filter,Guid userId);
        Task<string> UpdatePostLikeAsync(PostLikeModel postLike);
        Task<string> CreatePostComment(PostCommentModel postComment);
        Task<PostCommentResultModel> GetPostComments(Guid postId);
        Task<PostLikeResponseModel> GetPostLikes(Guid postId,Guid userId);
    }
}
