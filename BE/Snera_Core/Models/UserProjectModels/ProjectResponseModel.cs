namespace Snera_Core.Models.UserProjectModels
{
    public class ProjectResponseModel
    {
        public bool isEditable { get; set; } = false;
        public object Project { get; set; }
        public object ProjectDescription { get; set; }

        public IEnumerable<object> TeamMembers { get; set; }
        public IEnumerable<object> CurrentTasks { get; set; }
        public IEnumerable<object> Timelines { get; set; }
        public IEnumerable<object> DeveloperRequests { get; set; }
        public IEnumerable<object> ResourceLinks { get; set; }
    }

}
