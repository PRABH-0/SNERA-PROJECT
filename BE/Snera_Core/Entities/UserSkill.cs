namespace Snera_Core.Entities
{
    public class UserSkill
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Skill_Name { get; set; }

        public Guid User_Id { get; set; }
        public User User { get; set; }
    }
}
