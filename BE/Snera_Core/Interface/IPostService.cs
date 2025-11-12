using Snera_Core.Models.UserPostModels;

namespace Snera_Core.Interface
{
    public interface IPostService
    {
        Task<string> CreateUserPost(UserPostModel post);
    }
}
