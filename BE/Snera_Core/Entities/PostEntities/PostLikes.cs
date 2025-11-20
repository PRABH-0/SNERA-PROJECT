using System.ComponentModel.DataAnnotations.Schema;

namespace Snera_Core.Entities.PostEntities
{
    public class PostLikes
    {
        public Guid Id { get; set; }

        public Guid Post_Id { get; set; }
        [ForeignKey("Post_Id")]
        public UserPost id { get; set; } 

        public Guid User_Id { get; set; }

        public string Record_State { get; set; } = "Active";
        public DateTime Created_Timestamp { get; set; } = DateTime.Now;
    }
}
