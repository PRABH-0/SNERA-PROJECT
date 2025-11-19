namespace Snera_Core.Models.UserPostModels
{
    public class UserPostModel
    {
        public string Avtar_Name { get; set; }
        public string Author_Name { get; set; }
        public string Post_Type { get; set; } = string.Empty;//Client_Project, Skill_Showcase
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Budget { get; set; }
        public int Post_Like { get; set; }
        public DateTime Created_Timestamp { get; set; } 
        public DateTime? Last_Edited_By { get; set; }
        public string Record_State { get; set; } = "Active";
        public Guid User_Id { get; set; }
        public Guid Post_Id { get; set; }
        public List<SkillMode> Skills { get; set; } = new();
    }

    public class SkillMode
    {
        public string Skill_Name { get; set; } = string.Empty; // e.g. "React"
        public string Skill_Type { get; set; } = string.Empty; // "Have" or "Need"
    }
}

