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
                }),

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

                Team_Name = dto.Team_Name,
                Project_Type = dto.Project_Type,
                Project_Title = dto.Project_Title,
                Description = dto.Project_Description,
                Budget = dto.Budget,

                Project_Timeline = dto.Project_Timeline,
                Project_Visibility = dto.Project_Visibility,
                Project_Status = dto.Project_Status,

                Team_Size = dto.Team_Size,
                Experience_Level = dto.Experience_Level,

                Start_Date = dto.Start_Date,
                End_Date = dto.End_Date,

                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };

            await _unitOfWork.ProjectDescription.AddAsync(description);

            await _unitOfWork.ProjectTeamMembers.AddAsync(new ProjectTeamMembers
            {
                Id = Guid.NewGuid(),
                Project_Id = project.Id,
                User_Id = userId,
                Member_Role = "Admin",
                Is_Admin = true,
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
            if (dto.Link != null)
            {
                foreach (var l in dto.Link)
                {
                    await _unitOfWork.ResourseLinks.AddAsync(new ResourseLinks
                    {
                        Id = Guid.NewGuid(),
                        Project_Id = project.Id,
                        Link = l
                    });
                }
            }


            await _unitOfWork.SaveAllAsync();
            return "Project created successfully.";
        }

        public async Task<GetProjectListResponse> GetAllPosts(FilterModel request)
        {
            // Fix pagination values
            if (request.PageNumber <= 0) request.PageNumber = 1;
            if (request.PageSize <= 0) request.PageSize = 10;

            // 1️⃣ Get Active project descriptions
            var descriptions = await _unitOfWork.ProjectDescription
                .FindAsync(d => d.Record_State == "Active");

            // 2️⃣ Sorting
            descriptions = request.IsDescending
                ? descriptions.OrderByDescending(d => d.Created_At)
                : descriptions.OrderBy(d => d.Created_At);

            int totalCount = descriptions.Count();

            // 3️⃣ Pagination
            var paged = descriptions
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            if (!paged.Any())
            {
                return new GetProjectListResponse
                {
                    TotalCount = 0,
                    TotalPages = 0,
                    PageNumber = request.PageNumber,
                    PageSize = request.PageSize,
                    Projects = new List<ProjectListItemDto>()
                };
            }

            // Extract project IDs (for batch queries)
            var projectIds = paged.Select(p => p.Project_Id).ToList();

            // 4️⃣ Batch queries
            var allSkills = await _unitOfWork.ProjectSkill.FindAsync(s => projectIds.Contains(s.Project_Id));
            var allLikes = await _unitOfWork.ProjectLike.FindAsync(l => projectIds.Contains(l.Project_Id));
            var allComments = await _unitOfWork.ProjectComment.FindAsync(c => projectIds.Contains(c.Project_Id));
            var allLinks = await _unitOfWork.ResourseLinks.FindAsync(r => projectIds.Contains(r.Project_Id));

            // Load comment users
            var commentUserIds = allComments.Select(c => c.User_Id).Distinct().ToList();
            var commentUsers = await _unitOfWork.Users.FindAsync(u => commentUserIds.Contains(u.Id));

            // Final list
            var result = new List<ProjectListItemDto>();

            foreach (var desc in paged)
            {
                var projectId = desc.Project_Id;

                // Filter data for this project
                var skills = allSkills.Where(s => s.Project_Id == projectId);
                var likes = allLikes.Where(l => l.Project_Id == projectId);
                var comments = allComments.Where(c => c.Project_Id == projectId);
                var links = allLinks.Where(r => r.Project_Id == projectId);

                // Format comments
                var formattedComments = comments.Select(c =>
                {
                    var user = commentUsers.FirstOrDefault(u => u.Id == c.User_Id);

                    return new ProjectCommentModel
                    {
                        Comment_Id = c.Id,
                        User_Id = c.User_Id,
                        User_Name = user?.FullName ?? "Unknown",
                        Comment_Text = c.Comment_Text,
                        Created_At = c.Created_At
                    };
                }).ToList();

                // Add final project card
                result.Add(new ProjectListItemDto
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

                    // skills
                    SkillsHave = skills.Where(s => s.Skill_Type == "Have").Select(s => s.Skill_Name).ToList(),
                    SkillsNeed = skills.Where(s => s.Skill_Type == "Need").Select(s => s.Skill_Name).ToList(),

                    // likes
                    LikeCount = likes.Count(),
                    IsLiked = request.User_Id != null && likes.Any(l => l.User_Id == request.User_Id),

                    // comments
                    CommentCount = comments.Count(),
                    Comments = formattedComments,

                    // resource links
                    ResourceLinks = links.Select(l => l.Link).ToList()
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
