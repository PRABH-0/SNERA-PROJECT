using Snera_Core.Entities.ProjectEntities;
using Snera_Core.Models.UserProjectModels;

namespace Snera_Core.Models.HelperModels
{
    public class ProjectListItemDto
    {
        public Guid Project_Id { get; set; }
        public string? ProjectTitle { get; set; }
        public string? ProjectType { get; set; }
        public string? Description { get; set; }
        public string? Budget { get; set; }
        public string? Timeline { get; set; }
        public int TeamSize { get; set; } = 1;
        public string? ExperienceLevel { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<string> SkillsHave { get; set; } = new();
        public List<string> SkillsNeed { get; set; } = new();

        public int LikeCount { get; set; }
        public bool IsLiked { get; set; }

        public int CommentCount { get; set; }
        public List<ProjectCommentModel> Comments { get; set; } = new();

        public List<string> ResourceLinks { get; set; } = new();
    }
}
