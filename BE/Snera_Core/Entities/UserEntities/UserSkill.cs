namespace Snera_Core.Entities.UserEntities
{
    public class UserSkill
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Skill_Name { get; set; }=string.Empty;
        public string Skill_Type { get; set; } =string.Empty;

        public Guid UserId { get; set; }
    }
}
