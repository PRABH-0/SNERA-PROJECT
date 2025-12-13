using Snera_Core.Models.HelperModels;
using Snera_Core.Models.UserProjectModels;

namespace Snera_Core.Interface
{
    public interface IProjectService
    {
        Task<ProjectResponseModel> GetProject(string role , Guid postId);
        Task<string> CreateProject(UserPostModel post);
        Task<GetProjectListResponse> GetAllPosts(FilterModel request);
        Task<string> LikeProjectPost(Guid userId, Guid projectId);
        Task<string> CommentOnProject(Guid userId, Guid projectId, string comment);
        Task<string> AddCurrentTask(CreateTaskModel dto);
        Task<string> AddResourceLink(CreateResourceLinkModel dto);
        Task<string> AddProjectTimeline(CreateTimelineModel dto);
        Task<string> UpdateProjectDescription(UpdateProjectDescriptionModel model);
        Task<List<ProjectTaskResponseModel>> GetAllCurrentTasks(Guid projectId);

    }
}
