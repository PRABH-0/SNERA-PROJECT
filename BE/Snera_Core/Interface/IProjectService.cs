using Snera_Core.Models.UserPostModels;
using Snera_Core.Models.UserProjectModels;

namespace Snera_Core.Interface
{
    public interface IProjectService
    {
        Task<ProjectModel> GetProject(string role , Guid postId);
    }
}
