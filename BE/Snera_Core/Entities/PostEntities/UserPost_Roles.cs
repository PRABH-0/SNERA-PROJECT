using System.ComponentModel.DataAnnotations.Schema;

namespace Snera_Core.Entities.PostEntities
{
    public class UserPost_Roles
    {
        public Guid Id { get; set; }
        public Guid Post_Details_Id { get; set; }
        [ForeignKey("Post_Details_Id")]
        public UserPost_Details UserPost_Details { get; set; }

        public string Role_Name { get; set; } = string.Empty;   // e.g. "Backend Developer"
        public string Role_Type { get; set; } = string.Empty;   // "Have" or "Need"

        public DateTime Created_At { get; set; } = DateTime.UtcNow;
        public string Record_State { get; set; } = "Active";
    }
}
