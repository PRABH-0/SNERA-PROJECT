using Snera_Core.Models;
using Snera_Core.Models.UserPostModels;

namespace Snera_Core.Interface
{
    public interface IPostService
    {
        Task<string> CreateUserPost(UserPostDetailsModel post);
        Task<List<UserPostModel>> GetAllPostAsync(FilterModel filter);
        Task<string> UpdatePostLikeAsync(PostLikeModel postLike);
    }
}
