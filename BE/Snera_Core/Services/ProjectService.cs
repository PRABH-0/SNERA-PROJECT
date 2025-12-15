using Snera_Core.Common;
using Snera_Core.Entities.ProjectEntities;
using Snera_Core.Interface;
using Snera_Core.Models.HelperModels;
using Snera_Core.Models.UserProjectModels;
using Snera_Core.UnitOfWork;
using System.Globalization;

namespace Snera_Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ProjectTaskResponseModel>> GetAllCurrentTasks(Guid projectId)
        {
            var tasks = await _unitOfWork.ProjectCurrentTasks
                .FindAsync(t => t.Project_Id == projectId);

            var result = tasks
                .OrderByDescending(t => t.Created_At)
                .Select(t => new ProjectTaskResponseModel
                {
                    Id = t.Id,
                    Task_Name = t.Task_Name,
                    Task_End_Date = t.Task_End_Date,
                    Is_Completed = t.Is_Completed,
                    Is_Trashed = t.Is_Trashed,
                    User_Id = t.User_Id,
                    User_Name = t.User?.FullName ?? "Unknown",
                    Project_Id = t.Project_Id,
                    Created_At = t.Created_At
                })
                .ToList();

            return result;
        }
        public async Task<ProjectResponseModel> GetProject(string role, Guid projectId)
        {
            role = role?.ToLower();

            bool isEditable = role == "admin";
            bool displayJoinTeamButton = role == "user";

            // Load core project tables
            var project = await _unitOfWork.UserProject.FirstOrDefaultAsync(p => p.Id == projectId);
            var description = await _unitOfWork.ProjectDescription.FirstOrDefaultAsync(d => d.Project_Id == projectId);

            var teamMembers = await _unitOfWork.ProjectTeamMembers.GetAllAsync(t => t.Project_Id == projectId);
            var tasks = await _unitOfWork.ProjectCurrentTasks.GetAllAsync(t => t.Project_Id == projectId);
            var timelines = await _unitOfWork.ProjectTaskTimeline.GetAllAsync(t => t.Project_Id == projectId);
            var devRequests = await _unitOfWork.ProjectDeveloperRequest.GetAllAsync(t => t.Project_Id == projectId);
            var resourceLinks = await _unitOfWork.ResourseLinks.GetAllAsync(r => r.Project_Id == projectId);

            // ⭐ NEW → Load skills for this project
            var projectSkills = await _unitOfWork.ProjectSkill.GetAllAsync(s => s.Project_Id == projectId);

            // Load Developer Request Skills in bulk
            var devRequestIds = devRequests.Select(r => r.Id).ToList();
            var devRequestSkills = devRequestIds.Any()
                ? await _unitOfWork.ProjectDeveloperRequestSkill
                    .GetAllAsync(s => devRequestIds.Contains(s.DeveloperRequest_Id))
                : new List<ProjectDeveloperRequestSkill>();

            // Load all user profiles for developer requests
            var requestUserIds = devRequests.Select(r => r.User_Id).Distinct().ToList();
            var requestUsers = await _unitOfWork.Users.FindAsync(u => requestUserIds.Contains(u.Id));

            return new ProjectResponseModel
            {
                isEditable = isEditable,
                displayJoinTeamButton = displayJoinTeamButton,

                Project = project == null ? null : new
                {
                    project.Id,
                    project.Created_Timestamp,
                    project.Record_State,
                    project.User_Status
                },

                ProjectDescription = description == null ? null : new
                {
                    description.Id,
                    description.Project_Id,
                    description.Team_Name,
                    description.Project_Type,
                    description.Project_Title,
                    description.Description,
                    description.Budget,
                    description.Project_Timeline,
                    description.Project_Visibility,
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

                DeveloperRequests = devRequests.Select(r =>
                {
                    var user = requestUsers.FirstOrDefault(u => u.Id == r.User_Id);

                    return new
                    {
                        r.Id,
                        r.Project_Id,
                        r.User_Id,

                        User_Name = user?.FullName ?? "Unknown",
                        User_Email = user?.Email ?? "",
                        User_Avtar = user?.Avtar_Name ?? "",
                        User_Bio = user?.Bio ?? "",
                        User_CurrentRole = user?.CurrentRole ?? "",

                        r.Project_Interested_Text,
                        r.Project_Experience_Text,
                        r.Active_Hour,
                        r.Created_At,
                        r.Last_Edited_Timestamp,
                        r.Record_State,

                        Skills = devRequestSkills
                            .Where(s => s.DeveloperRequest_Id == r.Id)
                            .Select(s => s.Skill_Name)
                            .ToList()
                    };
                }),

                ResourceLinks = resourceLinks.Select(r => new
                {
                    r.Id,
                    r.Project_Id,
                    r.Link,
                    r.Created_At
                }),

                SkillsHave = projectSkills
                    .Where(s => s.Skill_Type == "Have")
                    .Select(s => s.Skill_Name)
                    .ToList(),

                SkillsNeed = projectSkills
                    .Where(s => s.Skill_Type == "Need")
                    .Select(s => s.Skill_Name)
                    .ToList()
            };
        }

        public async Task<CommonResponse> SendDeveloperRequest(JoinTeamRequestModel request)
        {
            var newRequest = new ProjectDeveloperRequest
            {
                Id = Guid.NewGuid(),
                User_Id = request.User_Id,
                Project_Id = request.Project_Id,
                Project_Interested_Text = request.InterestText,
                Project_Experience_Text = request.ExperienceText,
                Active_Hour = request.ActiveHour,
                Created_At = DateTime.UtcNow
            };

            await _unitOfWork.ProjectDeveloperRequest.AddAsync(newRequest);
            await _unitOfWork.SaveAllAsync();

            // ⭐ Save Skills Table (if any)
            if (request.Skills != null && request.Skills.Any())
            {
                foreach (var rawSkill in request.Skills)
                {
                    var skill = rawSkill?.Trim();
                    if (string.IsNullOrWhiteSpace(skill)) continue;

                    var skillEntity = new ProjectDeveloperRequestSkill
                    {
                        Id = Guid.NewGuid(),
                        DeveloperRequest_Id = newRequest.Id,
                        Skill_Name = skill
                    };

                    await _unitOfWork.ProjectDeveloperRequestSkill.AddAsync(skillEntity);
                }

                await _unitOfWork.SaveAllAsync();
            }

            return new CommonResponse(true, "Developer Request Sent Successfully!");
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

            // ⭐ UPDATED — Save Skills (Have + Need)
            if (dto.SkillsHave != null)
            {
                foreach (var skill in dto.SkillsHave)
                {
                    if (!string.IsNullOrWhiteSpace(skill))
                    {
                        await _unitOfWork.ProjectSkill.AddAsync(new ProjectSkill
                        {
                            Id = Guid.NewGuid(),
                            Project_Id = project.Id,
                            Skill_Name = skill.Trim(),
                            Skill_Type = "Have"   // ⭐ FIXED
                        });
                    }
                }
            }

            if (dto.SkillsNeed != null)
            {
                foreach (var skill in dto.SkillsNeed)
                {
                    if (!string.IsNullOrWhiteSpace(skill))
                    {
                        await _unitOfWork.ProjectSkill.AddAsync(new ProjectSkill
                        {
                            Id = Guid.NewGuid(),
                            Project_Id = project.Id,
                            Skill_Name = skill.Trim(),
                            Skill_Type = "Need"   // ⭐ FIXED
                        });
                    }
                }
            }

            // LINKS
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

                var skills = allSkills.Where(s => s.Project_Id == projectId);
                var likes = allLikes.Where(l => l.Project_Id == projectId);
                var comments = allComments.Where(c => c.Project_Id == projectId);
                var links = allLinks.Where(r => r.Project_Id == projectId);

                var adminMember = await _unitOfWork.ProjectTeamMembers
                    .FirstOrDefaultAsync(t => t.Project_Id == projectId && t.Is_Admin == true);

                string userName = "Unknown";
                Guid? userId = null;
                string? avtarName = "";

                if (adminMember != null)
                {
                    var user = await _unitOfWork.Users
                        .FirstOrDefaultAsync(u => u.Id == adminMember.User_Id);

                    if (user != null)
                    {
                        userId = user.Id;
                        userName = user.FullName;
                        avtarName = user.Avtar_Name;
                    }
                }

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

                // ⭐ UPDATED PROJECT ITEM
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

                    Team_Name = desc.Team_Name,
                    Start_Date = desc.Start_Date,
                    End_Date = desc.End_Date,

                    // Author
                    User_Id = userId,
                    Author_Name = userName,
                    Avtar_Name = avtarName,

                    // Skills
                    SkillsHave = skills.Where(s => s.Skill_Type == "Have").Select(s => s.Skill_Name).ToList(),
                    SkillsNeed = skills.Where(s => s.Skill_Type == "Need").Select(s => s.Skill_Name).ToList(),

                    // Likes
                    LikeCount = likes.Count(),
                    IsLiked = request.User_Id != null && likes.Any(l => l.User_Id == request.User_Id),

                    // Comments
                    CommentCount = comments.Count(),
                    Comments = formattedComments,

                    // Resources
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

        public async Task<string> AddResourceLink(CreateResourceLinkModel dto)
        {
            var project = await _unitOfWork.UserProject
                .FirstOrDefaultAsync(p => p.Id == dto.Project_Id);

            if (project == null)
                return "Project not found";

            var link = new ResourseLinks
            {
                Id = Guid.NewGuid(),
                User_Id = dto.User_Id,
                Project_Id = dto.Project_Id,
                Link = dto.Link,
                Created_At = DateTime.UtcNow
            };

            await _unitOfWork.ResourseLinks.AddAsync(link);
            await _unitOfWork.SaveAllAsync();

            return "Resource link added successfully";
        }

        public async Task<string> UpdateProjectDescription(UpdateProjectDescriptionModel model)
        {
            var desc = await _unitOfWork.ProjectDescription
                .FirstOrDefaultAsync(d => d.Project_Id == model.ProjectId);

            if (desc == null)
                return "Project description not found";

            desc.Team_Name = model.Team_Name;
            desc.Project_Type = model.Project_Type;
            desc.Project_Title = model.Project_Title;
            desc.Description = model.Description;
            desc.Budget = model.Budget;

            desc.Project_Timeline = model.Project_Timeline;
            desc.Project_Visibility = model.Project_Visibility;
            desc.Project_Status = model.Project_Status;

            desc.Team_Size = model.Team_Size;
            desc.Experience_Level = model.Experience_Level;

            desc.Start_Date = model.Start_Date;
            desc.End_Date = model.End_Date;

            desc.Last_Edited_Timestamp = DateTime.UtcNow;

            await _unitOfWork.SaveAllAsync();
            return "Project description updated successfully";
        }

        public async Task<string> AddProjectTimeline(CreateTimelineModel dto)
        {
            var project = await _unitOfWork.UserProject
                .FirstOrDefaultAsync(p => p.Id == dto.Project_Id);

            if (project == null)
                return "Project not found";

            var timeline = new ProjectTaskTimeline
            {
                Id = Guid.NewGuid(),
                User_Id = dto.User_Id,
                Project_Id = dto.Project_Id,
                TimeLine_Title = dto.TimeLine_Title,
                Date_TimeFrame = dto.Date_TimeFrame,
                Timeline_Description = dto.Timeline_Description,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };

            await _unitOfWork.ProjectTaskTimeline.AddAsync(timeline);
            await _unitOfWork.SaveAllAsync();

            return "Timeline item added successfully";
        }

        public async Task<string> AddCurrentTask(CreateTaskModel dto)
        {
            var project = await _unitOfWork.UserProject
                .FirstOrDefaultAsync(p => p.Id == dto.Project_Id);

            if (project == null)
                return "Project not found";

            var task = new ProjectCurrentTasks
            {
                Id = Guid.NewGuid(),
                User_Id = dto.User_Id,
                Project_Id = dto.Project_Id,
                Task_Name = dto.Task_Name,
                Task_End_Date = dto.Task_End_Date,
                Is_Completed = false,
                Is_Trashed = false,
                Created_At = DateTime.UtcNow,
                Record_State = "Active"
            };

            await _unitOfWork.ProjectCurrentTasks.AddAsync(task);
            await _unitOfWork.SaveAllAsync();

            return "Task added successfully";
        }
        public async Task<List<TrendingSkillDto>> GetTrendingSkills()
        {
            var projectSkills = await _unitOfWork.ProjectSkill.GetAllAsync();

            var requestSkills = await _unitOfWork.ProjectDeveloperRequestSkill.GetAllAsync();

            var projectSkillGroups = projectSkills
                .GroupBy(s => s.Skill_Name.Trim().ToLower())
                .Select(g => new
                {
                    Skill = g.Key,
                    ProjectCount = g.Count() // how many projects require this skill
                })
                .ToList();

            // 4️⃣ Group developer skills (developers who have used this in request)
            var developerSkillGroups = requestSkills
                .GroupBy(s => s.Skill_Name.Trim().ToLower())
                .Select(g => new
                {
                    Skill = g.Key,
                    DeveloperCount = g.Count()
                })
                .ToList();

            // 5️⃣ Merge both datasets
            var merged = projectSkillGroups
                .GroupJoin(
                    developerSkillGroups,
                    p => p.Skill,
                    d => d.Skill,
                    (p, dGroup) => new
                    {
                        Skill = p.Skill,
                        ProjectCount = p.ProjectCount,
                        DeveloperCount = dGroup.FirstOrDefault()?.DeveloperCount ?? 0
                    })
                .ToList();

            // 6️⃣ Calculate Trending Growth %
            var trendingList = merged.Select(m => new TrendingSkillDto
            {
                SkillName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(m.Skill),
                ProjectCount = m.ProjectCount,
                DeveloperCount = m.DeveloperCount,

                // Simple demand-to-supply ratio formula:  
                GrowthPercentage = CalculateGrowth(m.ProjectCount, m.DeveloperCount)
            })
            .OrderByDescending(x => x.GrowthPercentage) // highest growth first
            .Take(10) // return only top 10
            .ToList();

            return trendingList;
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
        private int CalculateGrowth(int projectCount, int developerCount)
        {
            if (developerCount == 0) return projectCount * 5; 

            double ratio = (double)projectCount / developerCount;

            double growth = ratio * 100;

            return (int)Math.Round(growth);
        }
    }
}
