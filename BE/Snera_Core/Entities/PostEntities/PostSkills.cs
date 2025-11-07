namespace Snera_Core.Entities.PostEntities
{
    public class PostSkills
    {
        public Guid id { get; set; }
        public Guid Post_Id { get; set; }
        public string Skill_Name { get; set; } = string.Empty;
        public string Skill_Type { get; set; } = string.Empty; //Have,Need
        public DateTime Created_Timestamp { get; set; } = DateTime.UtcNow;
        public DateTime? Last_Edited_By { get; set; }
        public string Record_State { get; set; } = "Active";
    }
}
