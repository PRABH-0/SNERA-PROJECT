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
            return null;
        }
        public async Task<string> CreateProject(UserPostModel dto)
        {
            if (dto == null)
                throw new Exception("Invalid project data received.");

            if (dto.User_Id == null)
                throw new Exception("User Id is missing for the project.");

            Guid userId = dto.User_Id.Value;

            var projectRepo = _unitOfWork.Repository<UserProject>();
            var project = new UserProject
            {
                Id = Guid.NewGuid(),
                Created_Timestamp = DateTime.UtcNow,
                Record_State = "Active",
                User_Status = "Offline"
            };
            await projectRepo.AddAsync(project);

            var descRepo = _unitOfWork.Repository<ProjectDescription>();
            var description = new ProjectDescription
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                Team_Name = string.Empty,
                Project_Type = dto.Post_Type,
                Project_Title = dto.Project_Title,
                Description = dto.Project_Description,
                Budget = dto.Budget,
                Project_Timeline = dto.Project_Timeline,
                Team_Size = dto.TeamSize,
                Experience_Level = dto.Experience_Level,
                Project_Status = "Active",
                Start_Date = null,
                End_Date = null,
                Last_Edited_Timestamp = null,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };
            await descRepo.AddAsync(description);

            var teamRepo = _unitOfWork.Repository<ProjectTeamMembers>();
            var team = new ProjectTeamMembers
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                Member_Role = string.Empty,
                Is_Admin = true,
                Last_Edited_Timestamp = null,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };
            await teamRepo.AddAsync(team);

            var timelineRepo = _unitOfWork.Repository<ProjectTaskTimeline>();
            var timeline = new ProjectTaskTimeline
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                TimeLine_Title = string.Empty,
                Date_TimeFrame = string.Empty,
                Timeline_Description = string.Empty,
                Last_Edited_Timestamp = null,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };
            await timelineRepo.AddAsync(timeline);

            var devReqRepo = _unitOfWork.Repository<ProjectDeveloperRequest>();
            var devReq = new ProjectDeveloperRequest
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                Project_Interested_Text = string.Empty,
                Project_Experience_Text = string.Empty,
                Active_Hour = 0,
                Last_Edited_Timestamp = null,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };
            await devReqRepo.AddAsync(devReq);

            var taskRepo = _unitOfWork.Repository<ProjectCurrentTasks>();
            var task = new ProjectCurrentTasks
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                Task_Name = string.Empty,
                Task_End_Date = null,
                Is_Trashed = false,
                Is_Completed = false,
                Last_Edited_Timestamp = null,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };
            await taskRepo.AddAsync(task);
            try
            {
                await _unitOfWork.SaveAllAsync();
            }
            catch (Exception ex)
            {
                var msg = ex.InnerException?.Message ?? ex.Message;
                throw new Exception("DATABASE ERROR: " + msg);
            }
            return "Project created successfully.";
        }

    }
}
