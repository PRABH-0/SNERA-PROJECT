namespace Snera_Core.Models.UserPostModels
{
    public class UserPostDetailsModel
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Post_Type { get; set; } = string.Empty;  // Client_Project, Skill_Showcase
        public int Budget { get; set; }
        public Guid User_Id { get; set; }

        // Post Details
        public string Project_Duration { get; set; } = string.Empty;
        public string Weekly_Commitment { get; set; } = string.Empty;
        public DateTime? Start_Date { get; set; }
        public string Requirements { get; set; } = string.Empty;
        public string Team_Info { get; set; } = string.Empty;
        public int Team_Size { get; set; }

        public string Author_Bio { get; set; } = string.Empty;
        public string Author_Experience { get; set; } = string.Empty;
        public double? Author_Rating { get; set; }
        public string Project_Status { get; set; } = "Open";
        public List<SkillModel> Skills { get; set; } = new();
        public List<RoleModel> Roles { get; set; } = new();
    }

    public class SkillModel
    {
        public string Skill_Name { get; set; } = string.Empty; // e.g. "React"
        public string Skill_Type { get; set; } = string.Empty; // "Have" or "Need"
    }

    public class RoleModel
    {
        public string Role_Name { get; set; } = string.Empty; // e.g. "Backend Developer"
        public string Role_Type { get; set; } = string.Empty; // "Have" or "Need"
    }
}
