using Snera_Core.Models.UserModels;

namespace Snera_Core.Models.UserProjectModels
{
    public class UserPostModel
    {
        public Guid? User_Id { get; set; }
        public string Post_Type { get; set; } = string.Empty;
        public string Project_Title {  get; set; } = string.Empty;
        public string Project_Description {  get; set; } = string.Empty;
        public string Budget {  get; set; } = string.Empty;
        public string Project_Timeline { get; set; } = string.Empty;
        public int TeamSize { get; set; } = 1;
        public string Experience_Level { get; set; } = string.Empty;

        public List<ProjectSkillsModel>? User_Skills { get; set; }


    }
}
