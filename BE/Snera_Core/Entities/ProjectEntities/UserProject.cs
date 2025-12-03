using Snera_Core.Entities.PostEntities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Snera_Core.Entities.ProjectEntities
{
    public class UserProject
    {
        public Guid Id { get; set; }
        public string Team_Name { get; set; } = string.Empty;
        public DateTime Created_Timestamp { get; set; } = DateTime.UtcNow;
        public string Record_State { get; set; } = "Active";
        public string User_Status { get; set; } = "Offline";
        public Guid? Post_Id { get; set; }
        [ForeignKey("Post_Id")]
        public UserPost? UserPost { get; set; }
        public ICollection<ProjectTeamMembers>? ProjectTeamMembers { get; set; }
        public ICollection<ProjectCurrentTasks>? ProjectCurrentTasks { get; set; }
        public ICollection<ProjectTimeline>? ProjectTimelines { get; set; }
    }
}
