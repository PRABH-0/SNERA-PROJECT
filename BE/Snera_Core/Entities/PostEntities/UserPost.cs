namespace Snera_Core.Entities.PostEntities
{
    public class UserPost
    {
        public Guid Id { get; set; }
        public string Post_Type { get; set; } = string.Empty;//Client_Project, Skill_Showcase
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Budget { get; set; } 
        public int Post_Like { get; set; }
        public DateTime Created_Timestamp { get; set; } = DateTime.UtcNow;
        public DateTime? Last_Edited_By {  get; set; }
        public string Record_State { get; set; } = "Active";
        public Guid User_Id { get; set; }

    }
}
