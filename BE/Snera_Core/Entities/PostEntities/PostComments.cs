namespace Snera_Core.Entities.PostEntities
{
    public class PostComments
    {
        public Guid Id { get; set; }
        public Guid Post_Id { get; set; }
        public Guid User_Id { get; set; }
        public string Comment_Text { get; set; }=string.Empty;
        public DateTime Created_Timestamp { get; set; } = DateTime.UtcNow;
        public DateTime? Last_Edited_By { get; set; }
        public string Record_State { get; set; } = "Active";
    }
}
