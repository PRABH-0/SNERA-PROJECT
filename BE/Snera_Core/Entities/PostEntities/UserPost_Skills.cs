using System.ComponentModel.DataAnnotations.Schema;

namespace Snera_Core.Entities.PostEntities
{
    public class UserPost_Skills
    {
        public Guid Id { get; set; }

        public Guid Post_Details_Id { get; set; }

        [ForeignKey("Post_Details_Id")]  
        public UserPost_Details UserPost_Details { get; set; }

        public string Skill_Name { get; set; } = string.Empty;
        public string Skill_Type { get; set; } = string.Empty;

        public DateTime Created_At { get; set; } = DateTime.UtcNow;
        public string Record_State { get; set; } = "Active";
    }
}
