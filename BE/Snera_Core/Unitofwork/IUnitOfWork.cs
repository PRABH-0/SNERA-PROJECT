using Snera_Core.Entities;
using Snera_Core.Entities.ProjectEntities;
using Snera_Core.Entities.UserEntities;
using Snera_Core.Interfaces;
using System;
using System.Threading.Tasks;

namespace Snera_Core.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        // User related repositories
        IRepository<User> Users { get; }
        IRepository<UserSkill> UserSkills { get; }

        IRepository<UserProject> UserProject { get; }
        IRepository<ProjectCurrentTasks> ProjectCurrentTasks { get; }
        IRepository<ProjectDescription> ProjectDescription { get; }
        IRepository<ProjectDeveloperRequest> ProjectDeveloperRequest { get; }
        IRepository<ProjectTaskTimeline> ProjectTaskTimeline { get; }
        IRepository<ProjectTeamMembers> ProjectTeamMembers { get; }

        IRepository<T> Repository<T>() where T : class;

        Task<int> SaveAllAsync();
    }
}