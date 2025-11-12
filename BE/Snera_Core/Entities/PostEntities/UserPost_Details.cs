using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Snera_Core.Entities.PostEntities
{
    public class UserPost_Details
    {
        public Guid Id { get; set; }
        public Guid UserPost_Id { get; set; }
        [ForeignKey("UserPost_Id")]
        public UserPost UserPost { get; set; }
        // Other fields
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

        public DateTime Created_At { get; set; } = DateTime.UtcNow;
        public string Record_State { get; set; } = "Active";

        public ICollection<UserPost_Skills>? Post_Skills { get; set; }
        public ICollection<UserPost_Roles>? Post_Roles { get; set; }
    }
}
