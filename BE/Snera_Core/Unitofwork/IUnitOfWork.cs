using Snera_Core.Entities;
using Snera_Core.Entities.PostEntities;
using Snera_Core.Entities.ProjectEntities;
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

        // Post related repositories
        IRepository<UserPost> UserPosts { get; }
        IRepository<UserPost_Details> UserPostDetails { get; }
        IRepository<UserPost_Skills> UserPostSkills { get; }
        IRepository<UserPost_Roles> UserPostRoles { get; }
        IRepository<PostComments> PostComments { get; }
        IRepository<PostLikes> PostLikes { get; }
        IRepository<ProjectCurrentTasks> ProjectCurrentTask {  get; }
        IRepository<ProjectDeveloperRequest> ProjectDeveloperRequest { get; }
        IRepository<ProjectTeamMembers> ProjectTeamMembers { get; }
        IRepository<ProjectTimeline> ProjectTimeline { get; }
        IRepository<UserProject> UserProject { get; }

        IRepository<T> Repository<T>() where T : class;

        Task<int> SaveAllAsync();
    }
}