using Snera_Core.Entities;
using Snera_Core.Interfaces;
using System;
using System.Threading.Tasks;

namespace Snera_Core.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User> Users { get; }
        IRepository<UserSkill> UserSkills { get; }

        IRepository<T> Repository<T>() where T : class;

        Task<int> CompleteAsync();
    }
}
