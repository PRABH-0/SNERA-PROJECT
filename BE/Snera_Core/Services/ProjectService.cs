using Snera_Core.Common;
using Snera_Core.Entities.ProjectEntities;
using Snera_Core.Interface;
using Snera_Core.Models.HelperModels;
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

        public async Task<ProjectResponseModel> GetProject(string role, Guid projectId)
        {
            var project = await _unitOfWork.UserProject.FirstOrDefaultAsync(p => p.Id == projectId);
            var description = await _unitOfWork.ProjectDescription.FirstOrDefaultAsync(d => d.Project_Id == projectId);
            var teamMembers = await _unitOfWork.ProjectTeamMembers.GetAllAsync(t => t.Project_Id == projectId);
            var tasks = await _unitOfWork.ProjectCurrentTasks.GetAllAsync(t => t.Project_Id == projectId);
            var timelines = await _unitOfWork.ProjectTaskTimeline.GetAllAsync(t => t.Project_Id == projectId);
            var devRequests = await _unitOfWork.ProjectDeveloperRequest.GetAllAsync(t => t.Project_Id == projectId);

            return new ProjectResponseModel
            {
                Project = new
                {
                    project.Id,
                    project.Created_Timestamp,
                    project.Record_State,
                    project.User_Status
                },

                ProjectDescription = new
                {
                    description.Id,
                    description.Project_Id,
                    description.Team_Name,
                    description.Project_Type,
                    description.Project_Title,
                    description.Description,
                    description.Budget,
                    description.Project_Timeline,
                    description.Team_Size,
                    description.Experience_Level,
                    description.Project_Status,
                    description.Start_Date,
                    description.End_Date,
                    description.Last_Edited_Timestamp,
                    description.Created_At
                },

                TeamMembers = teamMembers.Select(t => new
                {
                    t.Id,
                    t.User_Id,
                    t.Project_Id,
                    t.Member_Role,
                    t.Is_Admin,
                    t.Created_At,
                    t.Record_State
                }),

                CurrentTasks = tasks.Select(t => new
                {
                    t.Id,
                    t.Task_Name,
                    t.Task_End_Date,
                    t.Is_Completed,
                    t.Is_Trashed,
                    t.User_Id,
                    t.Project_Id,
                    t.Created_At
                }),

                Timelines = timelines.Select(t => new
                {
                    t.Id,
                    t.Project_Id,
                    t.User_Id,
                    t.TimeLine_Title,
                    t.Date_TimeFrame,
                    t.Timeline_Description,
                    t.Created_At
                }),

                DeveloperRequests = devRequests.Select(r => new
                {
                    r.Id,
                    r.Project_Id,
                    r.User_Id,
                    r.Project_Interested_Text,
                    r.Project_Experience_Text,
                    r.Active_Hour,
                    r.Created_At
                })
            };
        }

        public async Task<string> CreateProject(UserPostModel dto)
        {
            Guid userId = dto.User_Id.Value;

            var project = new UserProject
            {
                Id = Guid.NewGuid(),
                Created_Timestamp = DateTime.UtcNow,
                Record_State = "Active",
                User_Status = "Offline"
            };
            await _unitOfWork.UserProject.AddAsync(project);

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
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };
            await _unitOfWork.ProjectDescription.AddAsync(description);

            var team = new ProjectTeamMembers
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                Is_Admin = true,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };
            await _unitOfWork.ProjectTeamMembers.AddAsync(team);

            await _unitOfWork.ProjectTaskTimeline.AddAsync(new ProjectTaskTimeline
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                TimeLine_Title = "",
                Date_TimeFrame = "",
                Timeline_Description = "",
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            });

            await _unitOfWork.ProjectDeveloperRequest.AddAsync(new ProjectDeveloperRequest
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                Project_Interested_Text = "",
                Project_Experience_Text = "",
                Active_Hour = 0,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            });

            await _unitOfWork.ProjectCurrentTasks.AddAsync(new ProjectCurrentTasks
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                Task_Name = "",
                Is_Completed = false,
                Is_Trashed = false,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            });

            if (dto.User_Skills != null)
            {
                foreach (var s in dto.User_Skills)
                {
                    await _unitOfWork.ProjectSkill.AddAsync(new ProjectSkill
                    {
                        Id = Guid.NewGuid(),
                        Project_Id = project.Id,
                        Skill_Name = s.Skill_Name,
                        Skill_Type = s.Skill_Type
                    });
                }
            }

            await _unitOfWork.SaveAllAsync();
            return "Project created successfully.";
        }

        public async Task<GetProjectListResponse> GetAllPosts(FilterModel request)
        {
            if (request.PageNumber <= 0) request.PageNumber = 1;
            if (request.PageSize <= 0) request.PageSize = 10;

            var descriptions = await _unitOfWork.ProjectDescription
                .FindAsync(d => d.Record_State == "Active");

            // ------------------ SEARCH FILTER ------------------
            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                descriptions = descriptions.Where(d =>
                    d.Project_Title.Contains(request.Search, StringComparison.OrdinalIgnoreCase) ||
                    d.Description.Contains(request.Search, StringComparison.OrdinalIgnoreCase) ||
                    d.Project_Type.Contains(request.Search, StringComparison.OrdinalIgnoreCase)
                );
            }

            // ------------------ TYPE FILTER ------------------
            if (!string.IsNullOrWhiteSpace(request.Type))
            {
                descriptions = descriptions.Where(d =>
                    d.Project_Type.Equals(request.Type, StringComparison.OrdinalIgnoreCase));
            }

            // ------------------ STATE FILTER ------------------
            if (!string.IsNullOrWhiteSpace(request.State))
            {
                descriptions = descriptions.Where(d =>
                    d.Project_Status.Equals(request.State, StringComparison.OrdinalIgnoreCase));
            }

            // ------------------ SORTING ------------------
            descriptions = request.SortBy?.ToLower() switch
            {
                "title" => request.IsDescending ? descriptions.OrderByDescending(d => d.Project_Title)
                                                : descriptions.OrderBy(d => d.Project_Title),

                "type" => request.IsDescending ? descriptions.OrderByDescending(d => d.Project_Type)
                                               : descriptions.OrderBy(d => d.Project_Type),

                _ => request.IsDescending ? descriptions.OrderByDescending(d => d.Created_At)
                                          : descriptions.OrderBy(d => d.Created_At)
            };

            int totalCount = descriptions.Count();

            var paged = descriptions
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var result = new List<object>();

            foreach (var desc in paged)
            {
                Guid projectId = desc.Project_Id;

                // ------------------ SKILLS ------------------
                var skills = await _unitOfWork.ProjectSkill.FindAsync(s => s.Project_Id == projectId);

                var skillsHave = skills.Where(s => s.Skill_Type == "Have")
                                       .Select(s => s.Skill_Name)
                                       .ToList();

                var skillsNeed = skills.Where(s => s.Skill_Type == "Need")
                                       .Select(s => s.Skill_Name)
                                       .ToList();

                // ------------------ LIKES & ISLIKED ------------------
                int likes = await _unitOfWork.ProjectLike.CountAsync(l => l.Project_Id == projectId);

                bool isLiked = false;
                if (request.User_Id != null)
                {
                    var liked = await _unitOfWork.ProjectLike
                        .FirstOrDefaultAsync(l => l.Project_Id == projectId && l.User_Id == request.User_Id);

                    isLiked = liked != null;
                }

                // ------------------ COMMENTS ------------------
                var commentList = await _unitOfWork.ProjectComment
                    .FindAsync(c => c.Project_Id == projectId);

                var commentArray = new List<object>();

                foreach (var c in commentList)
                {
                    var user = await _unitOfWork.Users.FirstOrDefaultAsync(u => u.Id == c.User_Id);

                    commentArray.Add(new
                    {
                        Comment_Id = c.Id,
                        User_Id = c.User_Id,
                        User_Name = user?.FullName ?? "Unknown",
                        Comment_Text = c.Comment_Text,
                        Created_At = c.Created_At
                    });
                }

                // ------------------ FINAL OBJECT ------------------
                result.Add(new
                {
                    Project_Id = desc.Project_Id,
                    ProjectTitle = desc.Project_Title,
                    ProjectType = desc.Project_Type,
                    Description = desc.Description,
                    Budget = desc.Budget,
                    Timeline = desc.Project_Timeline,
                    TeamSize = desc.Team_Size,
                    ExperienceLevel = desc.Experience_Level,
                    CreatedAt = desc.Created_At,

                    SkillsHave = skillsHave,
                    SkillsNeed = skillsNeed,

                    LikeCount = likes,
                    isLiked = isLiked,

                    CommentCount = commentList.Count(),
                    Comments = commentArray
                });
            }

            return new GetProjectListResponse
            {
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize),
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Projects = result
            };
        }


        public async Task<string> LikeProjectPost(Guid userId, Guid projectId)
        {
            var user = await _unitOfWork.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return "Invalid user. User does not exist.";

            var project = await _unitOfWork.UserProject.FirstOrDefaultAsync(p => p.Id == projectId);
            if (project == null)
                return "Invalid project. Project does not exist.";

            var existing = await _unitOfWork.ProjectLike
                .FirstOrDefaultAsync(l => l.Project_Id == projectId && l.User_Id == userId);

            if (existing == null)
            {
                await _unitOfWork.ProjectLike.AddAsync(new ProjectLike
                {
                    Id = Guid.NewGuid(),
                    Project_Id = projectId,
                    User_Id = userId
                });

                await _unitOfWork.SaveAllAsync();
                return "Liked";
            }
            else
            {
                _unitOfWork.ProjectLike.Delete(existing);
                await _unitOfWork.SaveAllAsync();
                return "Disliked";
            }
        }


        public async Task<string> CommentOnProject(Guid userId, Guid projectId, string comment)
        {
            // -------------------- VALIDATION --------------------
            if (string.IsNullOrWhiteSpace(comment))
                return "Comment cannot be empty.";

            var user = await _unitOfWork.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return "Invalid user. User does not exist.";
            var project = await _unitOfWork.UserProject.FirstOrDefaultAsync(p => p.Id == projectId);
            if (project == null)
                return "Invalid project. Project does not exist.";

            await _unitOfWork.ProjectComment.AddAsync(new ProjectComment
            {
                Id = Guid.NewGuid(),
                Project_Id = projectId,
                User_Id = userId,
                Comment_Text = comment.Trim(),
                Created_At = DateTime.UtcNow
            });

            await _unitOfWork.SaveAllAsync();

            return "Comment added";
        }

    }
}
