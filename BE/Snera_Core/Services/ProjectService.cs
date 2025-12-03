using Snera_Core.Common;
using Snera_Core.Entities.ProjectEntities;
using Snera_Core.Interface;
using Snera_Core.Models.UserProjectModels;
using Snera_Core.UnitOfWork;

namespace Snera_Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ProjectModel> GetProject(string role, Guid postId)
        {
            // 1. Get Post
            var post = await _unitOfWork.UserPosts.GetByIdAsync(postId);
            if (post == null)
                throw new Exception(CommonErrors.PostNotFound);

            // 2. Get UserPostDetails
            var userProjectDetails = await _unitOfWork.UserPostDetails
                .FirstOrDefaultAsync(x => x.UserPost_Id == postId);

            // 3. Get UserProject
            var userProject = await _unitOfWork.UserProject
                .FirstOrDefaultAsync(x => x.Post_Id == postId);

            if (userProject == null)
                throw new Exception("Project not found for this post.");

            // 4. Related Collections
            var currentTasks = (await _unitOfWork.ProjectCurrentTask
                .FindAsync(x => x.Project_Id == userProject.Id && x.Record_State == "Active"))
                .ToList();

            var teamMembers = (await _unitOfWork.ProjectTeamMembers
                .FindAsync(x => x.Project_Id == userProject.Id && x.Record_State == "Active"))
                .ToList();

            var projectTimelines = (await _unitOfWork.ProjectTimeline
                .FindAsync(x => x.Project_Id == userProject.Id && x.Record_State == "Active"))
                .ToList();

            var developerRequests = (await _unitOfWork.ProjectDeveloperRequest
                .FindAsync(x => x.Project_Id == userProject.Id && x.Record_State == "Active"))
                .ToList();

            // 5. Skills
            var skills = await _unitOfWork.UserPostSkills
                .FindAsync(x => x.Post_Details_Id == userProjectDetails.Id);

            // 6. Prepare Model
            var model = new ProjectModel
            {
                // UserPost
                Post_Type = post.Post_Type,
                Title = post.Title,
                Description = post.Description,
                Budget = post.Budget,
                Post_Like = post.Post_Like,

                // UserProject
                Team_Name = userProject.Team_Name,
                Focus_Area = userProjectDetails.Focus_Area,

                // Post Details
                Project_Duration = userProjectDetails?.Project_Duration ?? "",
                Weekly_Commitment = userProjectDetails?.Weekly_Commitment ?? "",
                Start_Date = userProjectDetails?.Start_Date,
                End_Date = userProjectDetails?.End_Date,
                Difficulty_Level = userProjectDetails?.Difficulty_Level ?? "",
                Requirements = userProjectDetails?.Requirements ?? "",
                Team_Info = userProjectDetails?.Team_Info ?? "",
                Team_Size = userProjectDetails?.Team_Size ?? 0,
                Author_Bio = userProjectDetails?.Author_Bio ?? "",
                Author_Experience = userProjectDetails?.Author_Experience ?? "",
                Author_Rating = userProjectDetails?.Author_Rating,
                Project_Status = userProjectDetails?.Project_Status ?? "Active",

                // Skills
                Skills = skills.Select(s => new ProjectSkillsModel
                {
                    Skill_Name = s.Skill_Name,
                    Skill_Type = s.Skill_Type
                }).ToList(),

                // Current Tasks
                Current_Tasks = currentTasks.Select(t => new CurrentTaskModel
                {
                    Task_Name = t.Task_Name,
                    Task_End_Date = t.Task_End_Date,
                    Is_Completed = t.Is_Completed
                }).ToList(),

                // Team Members
                Project_Team_Members = teamMembers.Select(m => new ProjectTeamMemberModel
                {
                    Member_Role = m.Member_Role,
                    Is_Admin = m.Is_Admin
                }).ToList(),

                // Timeline
                Project_TimeLine_List = projectTimelines.Select(tl => new ProjectTimeLineModel
                {
                    TimeLine_Title = tl.TimeLine_Title,
                    Date_TimeFrame = tl.Date_TimeFrame,
                    Timeline_Description = tl.Timeline_Description
                }).ToList(),

                // Progress calculation
                Task_Count = currentTasks.Count,
                Task_Completed = currentTasks.Count(x => x.Is_Completed),
                Team_Member_Count = teamMembers.Count,
                Overall_Progress = currentTasks.Count == 0
                    ? 0
                    : (currentTasks.Count(x => x.Is_Completed) * 100f / currentTasks.Count)
            };

            return model;
        }

    }
}
